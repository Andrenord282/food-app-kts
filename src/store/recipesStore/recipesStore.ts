import { AxiosError } from 'axios';
import { computed, makeAutoObservable, observable } from 'mobx';
import { ErrorResponse } from 'services/axios/types';
import { FilterRecipes, RecipeApi, RecipeParamRequest } from 'store/models/recipes/modelsApi';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { normalizeRecipe } from 'store/models/recipes/utils';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';
import SpoonacularApiStore from 'store/spoonacularApiStore';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_meta' | '_offset' | '_numberRecipes' | '_filter' | '_resipes' | '_error';

const NUMBER_RECIPES = 9;

class RecipesStore implements ILocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _offset = 0;

  private _numberRecipes = NUMBER_RECIPES;

  private _filter: FilterRecipes = {
    query: '',
    type: [],
    cuisine: [],
  };

  private _resipes: CollectionModel<number, RecipeModel> = getInitialCollectionModel();

  private _error: ErrorResponse | null = null;

  constructor() {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _meta: observable,
      _offset: observable,
      _numberRecipes: observable,
      _filter: observable.ref,
      _resipes: observable.ref,
      _error: observable.ref,
      meta: computed,
      resipes: computed,
      numberRecipes: computed,
      error: computed,
    });
  }

  get resipes(): RecipeModel[] {
    return linearizeCollection<number, RecipeModel>(this._resipes);
  }

  get meta(): Meta {
    return this._meta;
  }

  get numberRecipes(): number {
    return this._numberRecipes;
  }

  get error(): ErrorResponse | null {
    return this._error;
  }

  private _initRequestParam() {
    const { cuisine, type } = this._filter;

    const param: RecipeParamRequest = {
      offset: this._offset,
      number: this._numberRecipes,
      ...this._filter,
      type: type ? type.join(',') : undefined,
      cuisine: cuisine ? cuisine.join(',') : undefined,
    };

    return param;
  }

  private async _request() {
    const param = this._initRequestParam();
    return await this._apiStore.getRecipes(param);
  }

  async getRecipes() {
    try {
      this._meta = Meta.loading;

      const { data } = await this._request();
      const { results } = data;

      this._resipes = normalizeCollection<number, RecipeApi, RecipeModel>(
        results,
        (element) => element.id,
        normalizeRecipe,
      );
      this._meta = Meta.success;
    } catch (error) {
      if (error instanceof AxiosError) {
        this._error = error.response?.data;
        this._meta = Meta.error;
      }
    }
  }

  destroy(): void {}
}

export default RecipesStore;
