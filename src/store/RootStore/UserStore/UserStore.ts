import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  collection,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { auth, db } from 'services/firebase/config';
import { RecipeClient, RecipeApi, normalizeRecipeApi } from 'store/models/recipe';
import { UserApi, UserClient, normalizeUser } from 'store/models/user';

type PrivateFields = '_userState' | '_user';

enum UserState {
  initial = 'initial',
  unknown = 'unknown',
  identified = 'identified',
}

export default class UserStore {
  private _auth = auth;
  private _userState: UserState = UserState.initial;
  private _user: UserClient | null = null;

  constructor() {
    this._eventListeningUserAuthorization();
    makeObservable<UserStore, PrivateFields>(this, {
      _userState: observable,
      _user: observable,
      userInitial: computed,
      userUnknown: computed,
      userIdentified: computed,
      recipeIdSavedList: computed,
    });
  }

  get userInitial(): boolean {
    return this._userState === UserState.initial;
  }

  get userUnknown(): boolean {
    return this._userState === UserState.unknown;
  }

  get userIdentified(): boolean {
    return this._userState === UserState.identified;
  }

  get userUid(): string {
    return this._user?.uid || '';
  }

  get recipeIdSavedList(): Set<number> {
    return this._user?.recipeIdSavedList || new Set();
  }

  private _initProfile = async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    return (await getDoc(userRef)).data() as UserApi;
  };

  private _eventListeningUserAuthorization = () => {
    onAuthStateChanged(this._auth, async (user) => {
      if (user) {
        const { uid } = user;
        const profile = await this._initProfile(uid);

        runInAction(() => {
          this._user = normalizeUser(profile);
          this._userState = UserState.identified;
        });
        return;
      }

      this._userState = UserState.unknown;
      this._user = null;
    });
  };

  private _addRecipeIdToSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdSavedList: arrayUnion(id),
    });
    this._user?.recipeIdSavedList.add(id);
  };

  private _addRecipeToSavedList = async (userUid: string, recipe: RecipeApi) => {
    const docRef = doc(db, `users`, userUid);
    const collectionRef = collection(docRef, 'recipeSavedList');
    await setDoc(doc(collectionRef, String(recipe.id)), recipe);
  };

  private _removeRecipeIdToSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdSavedList: arrayRemove(id),
    });
    this._user?.recipeIdSavedList.delete(id);
  };

  private _removeRecipeToSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, `users/${userUid}/recipeSavedList`, String(id));
    await deleteDoc(docRef);
  };

  addRecipeToSavedList = async (recipe: RecipeClient) => {
    try {
      if (this._user === null) {
        return;
      }
      await this._addRecipeIdToSavedList(this._user.uid, recipe.id);
      await this._addRecipeToSavedList(this._user.uid, normalizeRecipeApi(recipe));
    } catch (error) {
      console.log(error);
    }
  };

  removeRecipeToSavedList = async (recipe: RecipeClient) => {
    try {
      if (this._user === null) {
        return;
      }
      await this._removeRecipeIdToSavedList(this._user.uid, recipe.id);
      await this._removeRecipeToSavedList(this._user.uid, recipe.id);
    } catch (error) {
      console.log(error);
    }
  };
}
