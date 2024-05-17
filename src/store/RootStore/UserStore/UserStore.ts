import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, collection, setDoc, getDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { firebaseProfileApi } from 'services/firebase';
import { auth, db } from 'services/firebase/config';
import { RecipeClient, RecipeApi, normalizeRecipeApi, RecipeIngredientListClient } from 'store/models/recipe';
import { UserApi, UserClient, normalizeUser } from 'store/models/user';

type PrivateFields = '_auth' | '_userState' | '_user';

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
  private readonly _firebaseProfileApi = firebaseProfileApi;

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
      eventListeningUserAuthorization: action,
      addRecipeToSavedList: action,
      removeRecipeFromSavedList: action,
      addRecipeToShoppingList: action,
      removeRecipeFromShoppingList: action,
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

  eventListeningUserAuthorization = () => {
    onAuthStateChanged(this._auth, async (user) => {
      if (user) {
        const { uid } = user;
        const profile = await this._firebaseProfileApi.initProfile(uid);
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

  addRecipeToSavedList = async (recipe: RecipeClient): Promise<UserActionResponse> => {
    try {
      if (this._user === null) {
        return { state: 'error', message: 'You need to log in or register.' };
      }
      await this._firebaseProfileApi.saveToSavedList(this._user.uid, normalizeRecipeApi(recipe));
      runInAction(() => {
        this._user?.recipeIdSavedList.add(recipe.id);
      });

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
      await this._firebaseProfileApi.removeFromSavedList(this._user.uid, recipe.id);
      runInAction(() => {
        this._user?.recipeIdSavedList.delete(recipe.id);
      });

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
      await this._firebaseProfileApi.saveToShoppingList(this._user.uid, recipeingredients);
      runInAction(() => {
        this._user?.recipeIdShoppingList.add(recipeingredients.id);
      });

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
      await this._firebaseProfileApi.removeFromShoppingList(this._user.uid, recipeingredients.id);
      runInAction(() => {
        this._user?.recipeIdShoppingList.delete(recipeingredients.id);
      });
      return { state: 'success', message: 'The recipe has been removed from the shopping list' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { state: 'error', code: error.code, message: error.message };
      }
      return { state: 'error', message: 'Unexpected error' };
    }
  };
}
