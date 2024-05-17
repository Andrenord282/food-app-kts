import { AxiosError } from 'axios';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { ErrorResponse } from 'services/axios';
import { SpoonacularApiStore } from 'store';
import { RecipeDetailsClient, normalizeRecipeDetails } from 'store/models/recipe';
import { Meta, TLocalStore, ResponseStatus } from 'utils';

type PrivateFields = '_meta' | '_reсipe' | '_error';

export default class RecipeStore implements TLocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _reсipe: RecipeDetailsClient | null = null;

  private _error: ErrorResponse | null = null;

  constructor() {
    makeAutoObservable<RecipeStore, PrivateFields>(this, {
      _meta: observable,
      _reсipe: observable.ref,
      _error: observable.ref,
      meta: computed,
      recipe: computed,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isError: computed,
      getRecipe: action,
    });
  }

  get recipe(): RecipeDetailsClient | null {
    return this._reсipe;
  }

  get meta(): Meta {
    return this._meta;
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

  get error(): ErrorResponse | null {
    return this._error;
  }

  private async _request(id: string) {
    return await this._apiStore.getRecipe(id);
  }

  getRecipe = async (id: string) => {
    try {
      this._meta = Meta.loading;

      const { data } = await this._request(id);
      runInAction(() => {
        this._reсipe = normalizeRecipeDetails(data);
        this._meta = Meta.success;
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === ResponseStatus.NotFound) {
          this._error = {
            code: error.response?.status,
            name: error.name,
            message: error.message,
          };
        }
        this._meta = Meta.error;
      }
    }
  };

  destroy(): void {}
}
