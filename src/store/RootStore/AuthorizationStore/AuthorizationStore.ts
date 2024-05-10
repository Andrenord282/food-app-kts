import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  AuthError,
} from 'firebase/auth';
import { computed, makeAutoObservable, observable } from 'mobx';
import { auth } from 'services/firebase/config';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_meta';

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
      _meta: observable,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isError: computed,
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

  signUp = async ({ displayName, email, password }: SignUpData): Promise<AuthError | { code: string }> => {
    try {
      this._meta = Meta.loading;
      const response = await createUserWithEmailAndPassword(this._auth, email, password);
      const { user } = response;
      await updateProfile(user, { displayName });
      this._meta = Meta.success;
      return { code: 'success' };
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  signIn = async ({ email, password }: SignInData): Promise<AuthError | { code: string }> => {
    try {
      this._meta = Meta.loading;
      await signInWithEmailAndPassword(this._auth, email, password);
      this._meta = Meta.success;
      return { code: 'success' };
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
