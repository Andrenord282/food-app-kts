import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, collection, setDoc, getDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { auth, db } from 'services/firebase/config';
import { RecipeClient, RecipeApi, normalizeRecipeApi, RecipeIngredientListClient } from 'store/models/recipe';
import { UserApi, UserClient, normalizeUser } from 'store/models/user';

type PrivateFields =
  | '_auth'
  | '_userState'
  | '_user'
  | '_addRecipeIdToSavedList'
  | '_removeRecipeIdFromSavedList'
  | '_addRecipeIdToShoppingList'
  | '_removeRecipeIdFromShoppingList';

type UserActionResponse = {
  state: 'error' | 'success';
  code?: string;
  message?: string;
};

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
    makeObservable<UserStore, PrivateFields>(this, {
      _auth: observable,
      _userState: observable,
      _user: observable,
      userInitial: computed,
      userUnknown: computed,
      userIdentified: computed,
      userUid: computed,
      recipeIdSavedList: computed,
      recipeIdShoppingList: computed,
      _addRecipeIdToSavedList: action,
      _removeRecipeIdFromSavedList: action,
      _addRecipeIdToShoppingList: action,
      _removeRecipeIdFromShoppingList: action,
      eventListeningUserAuthorization: action,
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

  get recipeIdShoppingList(): Set<number> {
    return this._user?.recipeIdShoppingList || new Set();
  }

  private _initProfile = async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    return (await getDoc(userRef)).data() as UserApi;
  };

  eventListeningUserAuthorization = () => {
    onAuthStateChanged(this._auth, async (user) => {
      if (user) {
        const { uid } = user;
        const profile = await this._initProfile(uid);
        if (!profile) return;
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
    runInAction(() => {
      this._user?.recipeIdSavedList.add(id);
    });
  };

  private _addRecipeToSavedList = async (userUid: string, recipe: RecipeApi) => {
    const docRef = doc(db, `users`, userUid);
    const collectionRef = collection(docRef, 'recipeSavedList');
    await setDoc(doc(collectionRef, String(recipe.id)), recipe);
  };

  private _removeRecipeIdFromSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdSavedList: arrayRemove(id),
    });
    runInAction(() => {
      this._user?.recipeIdSavedList.delete(id);
    });
  };

  private _removeRecipeFromSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, `users/${userUid}/recipeSavedList`, String(id));
    await deleteDoc(docRef);
  };

  private _addRecipeToShoppingList = async (userUid: string, recipeingredients: RecipeIngredientListClient) => {
    const docRef = doc(db, `users`, userUid);
    const collectionRef = collection(docRef, 'recipeShoppingList');
    await setDoc(doc(collectionRef, String(recipeingredients.id)), recipeingredients);
  };

  private _addRecipeIdToShoppingList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdShoppingList: arrayUnion(id),
    });
    runInAction(() => {
      this._user?.recipeIdShoppingList.add(id);
    });
  };

  private _removeRecipeFromShoppingList = async (userUid: string, id: number) => {
    const docRef = doc(db, `users/${userUid}/recipeShoppingList`, String(id));
    await deleteDoc(docRef);
  };

  private _removeRecipeIdFromShoppingList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdShoppingList: arrayRemove(id),
    });
    runInAction(() => {
      this._user?.recipeIdShoppingList.delete(id);
    });
  };

  addRecipeToSavedList = async (recipe: RecipeClient): Promise<UserActionResponse> => {
    try {
      if (this._user === null) {
        return { state: 'error', message: 'You need to log in or register.' };
      }
      await this._addRecipeIdToSavedList(this._user.uid, recipe.id);
      await this._addRecipeToSavedList(this._user.uid, normalizeRecipeApi(recipe));
      return { state: 'success', message: 'Recipe has been added to the save list' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { state: 'error', code: error.code, message: error.message };
      }
      return { state: 'error', message: 'Unexpected error' };
    }
  };

  removeRecipeFromSavedList = async (recipe: RecipeClient): Promise<UserActionResponse> => {
    try {
      if (this._user === null) {
        return { state: 'error', message: 'You need to log in or register.' };
      }
      await this._removeRecipeIdFromSavedList(this._user.uid, recipe.id);
      await this._removeRecipeFromSavedList(this._user.uid, recipe.id);
      return { state: 'success', message: 'The recipe has been removed from the saved list' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { state: 'error', code: error.code, message: error.message };
      }
      return { state: 'error', message: 'Unexpected error' };
    }
  };

  addRecipeToShoppingList = async (recipeingredients: RecipeIngredientListClient): Promise<UserActionResponse> => {
    try {
      if (this._user === null) {
        return { state: 'error', message: 'You need to log in or register.' };
      }
      await this._addRecipeIdToShoppingList(this._user.uid, recipeingredients.id);
      await this._addRecipeToShoppingList(this._user.uid, recipeingredients);
      return { state: 'success', message: 'Recipe has been added to the shopping list' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { state: 'error', code: error.code, message: error.message };
      }
      return { state: 'error', message: 'Unexpected error' };
    }
  };

  removeRecipeFromShoppingList = async (recipeingredients: RecipeIngredientListClient): Promise<UserActionResponse> => {
    try {
      if (this._user === null) {
        return { state: 'error', message: 'You need to log in or register.' };
      }
      await this._removeRecipeFromShoppingList(this._user.uid, recipeingredients.id);
      await this._removeRecipeIdFromShoppingList(this._user.uid, recipeingredients.id);
      return { state: 'success', message: 'The recipe has been removed from the shopping list' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { state: 'error', code: error.code, message: error.message };
      }
      return { state: 'error', message: 'Unexpected error' };
    }
  };
}
