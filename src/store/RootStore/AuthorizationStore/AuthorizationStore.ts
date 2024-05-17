import { AuthError } from 'firebase/auth';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { firebaseAuthApi } from 'services/firebase';
import { SignUpData } from 'store/models/user';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_auth' | '_meta';

type SignInData = {
  email: string;
  password: string;
};

export default class AuthorizationStore implements TLocalStore {
  private _meta: Meta = Meta.initial;
  private readonly _fireBaseAuthApi = firebaseAuthApi;

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

  signUp = async ({
    displayName,
    email,
    password,
  }: SignUpData): Promise<AuthError | { code: string; message?: string }> => {
    try {
      this._meta = Meta.loading;
      const response = await this._fireBaseAuthApi.signUp({
        displayName,
        email,
        password,
      });
      this._meta = Meta.success;
      return response;
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  signIn = async ({ email, password }: SignInData): Promise<AuthError | { code: string; message?: string }> => {
    try {
      this._meta = Meta.loading;
      const response = await this._fireBaseAuthApi.signIn({ email, password });
      this._meta = Meta.success;
      return response;
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  signOut = async () => {
    try {
      this._meta = Meta.loading;
      await this._fireBaseAuthApi.signOut();
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      return error as AuthError;
    }
  };

  destroy(): void {}
}
