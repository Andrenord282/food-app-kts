import { AxiosError } from 'axios';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { ErrorResponse } from 'services/axios';
import { SpoonacularApiStore } from 'store';
import { RecipeDetailModel } from 'store/models/recipes/modelsClient';
import { normalizeRecipeDetail } from 'store/models/recipes/utils';
import { Meta, TLocalStore, ResponseStatus } from 'utils';

type PrivateFields = '_meta' | '_reсipe' | '_error';

export default class RecipeStore implements TLocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _reсipe: RecipeDetailModel | null = null;

  private _error: ErrorResponse | null = null;

  constructor() {
    makeAutoObservable<RecipeStore, PrivateFields>(this, {
      _meta: observable,
      _reсipe: observable.ref,
      _error: observable.ref,
      meta: computed,
      recipe: computed,
      getRecipe: action,
    });
  }

  get recipe(): RecipeDetailModel | null {
    return this._reсipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  get error(): ErrorResponse | null {
    return this._error;
  }

  private async _request(id: string) {
    return await this._apiStore.getRecipe(id);
  }

  async getRecipe(id: string) {
    try {
      this._meta = Meta.loading;

      const { data } = await this._request(id);
      runInAction(() => {
        this._reсipe = normalizeRecipeDetail(data);
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
  }

  destroy(): void {}
}
