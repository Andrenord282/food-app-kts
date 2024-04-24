import { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeAutoObservable, observable, reaction, runInAction } from 'mobx';
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

type PrivateFields = '_meta' | '_offset' | '_total' | '_limit' | '_filter' | '_recipes' | '_error' | '_query' | '_page';

const RECIPES_LIMIT = 9;

export default class RecipesStore implements ILocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _recipes: CollectionModel<number, RecipeModel> = getInitialCollectionModel();

  private _error: ErrorResponse | null = null;

  private _query: string = rootStore.query.getParam('query');

  private _type: string = rootStore.query.getParam('type');

  private _page: number = rootStore.query.getParam('page') ? Number(rootStore.query.getParam('page')) : 1;

  private _limit = RECIPES_LIMIT;

  private _offset = this._page > 1 ? this._page * this._limit - this._limit : 0;

  private _total: number = 0;

  private _filter: FilterRecipes = {
    query: this._query,
    type: this._type,
  };

  constructor() {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _meta: observable,
      _offset: observable,
      _limit: observable,
      _filter: observable.ref,
      _recipes: observable.ref,
      _error: observable.ref,
      _query: observable,
      _page: observable,
      _total: observable,
      meta: computed,
      recipes: computed,
      limit: computed,
      error: computed,
      page: computed,
      getRecipes: action,
      updatePage: action,
      setFilter: action,
    });
  }

  get recipes(): RecipeModel[] {
    return linearizeCollection<number, RecipeModel>(this._recipes);
  }

  get meta(): Meta {
    return this._meta;
  }

  get limit(): number {
    return this._limit;
  }

  get error(): ErrorResponse | null {
    return this._error;
  }

  get page(): number {
    return this._page;
  }

  get total(): number {
    return this._total;
  }

  private _initRequestParam() {
    const param: RecipeParamRequest = {
      offset: this._offset,
      number: this._limit,
      ...this._filter,
    };

    return param;
  }

  private async _request() {
    const param = this._initRequestParam();
    return await this._apiStore.getRecipes(param);
  }

  private readonly _querySearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('query'),
    async (query) => {
      this._filter.query = query as string;
      this.updatePage(1);
      await this.getRecipes();
    },
  );

  private readonly _queryTypeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    async (type) => {
      this._filter.type = type as string;
    },
  );

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('page'),
    async (page) => {
      if (page) {
        this.updatePage(Number(page));
        await this.getRecipes();
      }
    },
  );

  updatePage = (page: number): void => {
    this._page = page;
    this._offset = page * this._limit - this._limit;
  };

  async getRecipes() {
    try {
      this._meta = Meta.loading;
      this._recipes = getInitialCollectionModel();

      const { data } = await this._request();
      const { results } = data;

      runInAction(() => {
        this._recipes = normalizeCollection<number, RecipeApi, RecipeModel>(
          results,
          (element) => element.id,
          normalizeRecipe,
        );
        this._total = data.totalResults;
        this._meta = Meta.success;
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        this._error = error.response?.data;
        this._meta = Meta.error;
      }
    }
  }

  setFilter(key: keyof FilterRecipes, type: string) {
    this._filter[key as keyof FilterRecipes] = type;
  }

  destroy(): void {}
}
