import { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeAutoObservable, observable, reaction, runInAction } from 'mobx';
import { ErrorResponse } from 'services/axios';
import { rootStore, SpoonacularApiStore } from 'store';
import { RecipeClient, FilterRecipeOverviewList } from 'store/models/recipe';
import { RecipeApi, RecipeParamRequest } from 'store/models/recipes/modelsApi';
import { normalizeRecipe } from 'store/models/recipes/utils';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_meta' | '_offset' | '_total' | '_limit' | '_filterList' | '_list' | '_error' | '_page';

const RECIPES_LIMIT = 9;

export default class RecipesOverviewListStore implements TLocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _list: CollectionModel<number, RecipeClient> = getInitialCollectionModel();

  private _error: ErrorResponse | null = null;

  private _page: number = rootStore.query.getParam('page-overview')
    ? Number(rootStore.query.getParam('page-overview'))
    : 1;

  private _limit = RECIPES_LIMIT;

  private _offset = this._page > 1 ? this._page * this._limit - this._limit : 0;

  private _total: number = 0;

  private _filterList: FilterRecipeOverviewList = {
    query: rootStore.query.getParam('query'),
    type: rootStore.query.getParam('type'),
    cuisine: rootStore.query.getParam('cuisine'),
  };

  constructor() {
    makeAutoObservable<RecipesOverviewListStore, PrivateFields>(this, {
      _meta: observable,
      _offset: observable,
      _limit: observable,
      _filterList: observable.ref,
      _list: observable.ref,
      _error: observable.ref,
      _page: observable,
      _total: observable,
      meta: computed,
      list: computed,
      limit: computed,
      error: computed,
      page: computed,
      total: computed,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isError: computed,
      isEmpty: computed,
      getList: action,
      updatePage: action,
    });
  }

  get list(): RecipeClient[] {
    return linearizeCollection<number, RecipeClient>(this._list);
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

  get isEmpty(): boolean {
    return this._meta === Meta.success && this._list.order.length === 0;
  }

  private _initRequestParam(): RecipeParamRequest {
    const param: RecipeParamRequest = {
      offset: this._offset,
      number: this._limit,
      ...this._filterList,
    };

    return param;
  }

  private async _request() {
    const param = this._initRequestParam();
    return await this._apiStore.getRecipes(param);
  }

  private readonly _queryRecipeTypeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    async (type) => {
      this._filterList.type = type as string;
    },
  );

  private readonly _queryRecipeCuisineReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('cuisine'),
    async (cuisine) => {
      this._filterList.cuisine = cuisine as string;
    },
  );

  private readonly _queryRecipeQueryReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('query'),
    async (query) => {
      this._filterList.query = query as string;
      await this.getList({ resetPage: true });
    },
  );

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('page-overview'),
    async (page) => {
      if (page) {
        this.updatePage(Number(page));
        await this.getList();
      }
    },
  );

  updatePage = (page: number) => {
    this._page = page;
    this._offset = page * this._limit - this._limit;
  };

  getList = async (option: { resetPage?: boolean } = {}) => {
    try {
      const { resetPage = false } = option;
      this._meta = Meta.loading;
      this._list = getInitialCollectionModel();

      if (resetPage) this.updatePage(1);
      const { data } = await this._request();
      const { results } = data;

      runInAction(() => {
        this._list = normalizeCollection<number, RecipeApi, RecipeClient>(
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
  };

  destroy(): void {
    this._queryRecipeCuisineReaction();
    this._queryRecipeTypeReaction();
    this._queryRecipeQueryReaction();
    this._queryPageReaction();
  }
}
