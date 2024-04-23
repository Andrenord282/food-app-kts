import { AxiosError } from 'axios';
import { IReactionDisposer, computed, makeAutoObservable, observable, reaction } from 'mobx';
import { ErrorResponse } from 'services/axios/types';
import rootStore from 'store/RootStore';
import SpoonacularApiStore from 'store/SpoonacularApiStore';
import { FilterRecipes, RecipeApi, RecipeParamRequest } from 'store/models/recipes/modelsApi';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { normalizeRecipe } from 'store/models/recipes/utils';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_meta' | '_offset' | '_numberRecipes' | '_filter' | '_resipes' | '_error' | '_query';

const NUMBER_RECIPES = 9;

class RecipesStore implements ILocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _offset = 0;

  private _numberRecipes = NUMBER_RECIPES;

  private _resipes: CollectionModel<number, RecipeModel> = getInitialCollectionModel();

  private _error: ErrorResponse | null = null;

  private _query: string = rootStore.query.getParam('query');

  private _filter: FilterRecipes = {
    query: this._query,
  };

  constructor() {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _meta: observable,
      _offset: observable,
      _numberRecipes: observable,
      _filter: observable.ref,
      _resipes: observable.ref,
      _error: observable.ref,
      _query: observable,
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
    const param: RecipeParamRequest = {
      offset: this._offset,
      number: this._numberRecipes,
      ...this._filter,
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

  private readonly _querySearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('query'),
    async (query) => {
      this._filter.query = query as string;
      await this.getRecipes();
    },
  );

  private readonly _queryTypeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    async (type) => {
      this._filter.type = type as string;
      await this.getRecipes();
    },
  );

  destroy(): void {}
}

export default RecipesStore;
