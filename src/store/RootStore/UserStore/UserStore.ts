import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { computed, makeObservable, observable, runInAction, toJS } from 'mobx';
import { auth, db } from 'services/firebase/config';
import { UserApi, UserClient, normalizeUser } from 'store/models/user';
import { Meta } from 'utils';

type PrivateFields = '_userState' | '_user';

enum UserState {
  initial = 'initial',
  unknown = 'unknown',
  identified = 'identified',
}

class UserStore {
  private _auth = auth;
  private _userState: UserState = UserState.initial;

  private _user: UserClient = {
    uid: '',
    userName: '',
    recipeSavedList: new Set(),
    recipeShoppingList: new Set(),
  };

  constructor() {
    this._eventListeningUserAuthorization();
    makeObservable<UserStore, PrivateFields>(this, {
      _userState: observable,
      _user: observable,
      userInitial: computed,
      userUnknown: computed,
      userIdentified: computed,
      recipeSavedList: computed,
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

  get recipeSavedList(): Set<number> {
    return this._user.recipeSavedList;
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
      this._user = {
        uid: '',
        userName: '',
        recipeSavedList: new Set(),
        recipeShoppingList: new Set(),
      };
    });
  };

  addRecipeToSavedList = async (recipeId: number) => {
    try {
      const userRef = doc(db, 'users', this._user.uid);
      await updateDoc(userRef, {
        recipeSavedList: arrayUnion(recipeId),
      });
      this._user.recipeSavedList.add(recipeId);
    } catch (error) {}
  };

  removeRecipeToSavedList = async (recipeId: number) => {
    try {
      const userRef = doc(db, 'users', this._user.uid);
      await updateDoc(userRef, {
        recipeSavedList: arrayRemove(recipeId),
      });
      this._user.recipeSavedList.delete(recipeId);
    } catch (error) {}
  };
}

export default UserStore;
