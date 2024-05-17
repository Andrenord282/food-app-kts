import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  AuthError,
} from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { auth, db } from 'services/firebase/config';
import { UserApi } from 'store/models/user';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_auth' | '_meta';

type SignUpData = {
  displayName: string;
  email: string;
  password: string;
};

type SignInData = {
  email: string;
  password: string;
};

export default class AuthorizationStore implements TLocalStore {
  private _auth = auth;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable<AuthorizationStore, PrivateFields>(this, {
      _auth: observable,
      _meta: observable,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isError: computed,
      signUp: action,
      signIn: action,
      signOut: action,
    });
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isInitial(): boolean {
    return this._meta === Meta.initial;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  private _usernameExists = async (displayName: string) => {
    const q = query(collection(db, 'users'), where('displayName', '==', displayName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  private _createUser = async (uid: string, displayName: string) => {
    const user: UserApi = {
      uid,
      displayName,
      recipeIdSavedList: [],
      recipeShoppingList: [],
    };
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, uid), user);
  };

  signUp = async ({
    displayName,
    email,
    password,
  }: SignUpData): Promise<AuthError | { code: string; message?: string }> => {
    try {
      this._meta = Meta.loading;
      const usernameExists = await this._usernameExists(displayName);
      if (usernameExists) {
        throw new FirebaseError('auth/name-already-in-use', 'name already in use');
      }
      const response = await createUserWithEmailAndPassword(this._auth, email, password);
      const { user } = response;
      await updateProfile(user, { displayName });
      await this._createUser(user.uid, displayName);
      this._meta = Meta.success;
      return { code: 'success', message: `Welcome ${displayName}!` };
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  signIn = async ({ email, password }: SignInData): Promise<AuthError | { code: string; message?: string }> => {
    try {
      this._meta = Meta.loading;
      await signInWithEmailAndPassword(this._auth, email, password);
      this._meta = Meta.success;
      return { code: 'success', message: `Hello ${this._auth.currentUser?.displayName}!` };
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  signOut = async () => {
    try {
      this._meta = Meta.loading;
      await signOut(auth);
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  destroy(): void {}
}
