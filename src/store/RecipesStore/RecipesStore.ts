import { AxiosError } from 'axios';
import { IReactionDisposer, action, computed, makeAutoObservable, observable, reaction, runInAction } from 'mobx';
import { ErrorResponse } from 'services/axios';
import { rootStore, IntervalStore, SpoonacularApiStore } from 'store';
import { FilterRecipes, FilterRecipesSchema, RecipeApi, RecipeParamRequest } from 'store/models/recipes/modelsApi';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { normalizeRecipe } from 'store/models/recipes/utils';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_meta' | '_offset' | '_total' | '_limit' | '_filter' | '_recipes' | '_error' | '_page';

const RECIPES_LIMIT = 9;

export default class RecipesStore implements TLocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private _meta: Meta = Meta.initial;

  private _recipes: CollectionModel<number, RecipeModel> = getInitialCollectionModel();

  private _error: ErrorResponse | null = null;

  private _page: number = rootStore.query.getParam('page') ? Number(rootStore.query.getParam('page')) : 1;

  private _limit = RECIPES_LIMIT;

  private _offset = this._page > 1 ? this._page * this._limit - this._limit : 0;

  private _total: number = 0;

  private _filter: FilterRecipes = {
    query: rootStore.query.getParam('query') || '',
    type: rootStore.query.getParam('type') || '',
    cuisine: '',
  };

  private readonly _intervalStore = new IntervalStore();

  constructor() {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _meta: observable,
      _offset: observable,
      _limit: observable,
      _filter: observable.ref,
      _recipes: observable.ref,
      _error: observable.ref,
      _page: observable,
      _total: observable,
      meta: computed,
      recipes: computed,
      limit: computed,
      error: computed,
      page: computed,
      filter: computed,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isError: computed,
      isEmpty: computed,
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

  get filter(): FilterRecipesSchema<string, string> {
    return {
      query: this._filter.query,
      type: !this._filter.type ? [] : this._filter.type.split(',').map((string) => ({ key: string, value: string })),
      cuisine: !this._filter.cuisine
        ? []
        : this._filter.cuisine.split(',').map((string) => ({ key: string, value: string })),
    };
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
    return this._meta === Meta.success && this._recipes.order.length === 0;
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
      } else {
        this.updatePage(1);
      }
    },
  );

  updatePage = (page: number) => {
    this._page = page;
    this._offset = page * this._limit - this._limit;
  };

  getRecipes = async () => {
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
  };

  setFilter = (key: keyof FilterRecipes, type: string) => {
    this._filter[key as keyof FilterRecipes] = type;

    if (key === 'query') {
      this._intervalStore.startTimeout(async () => {
        this.updatePage(1);
        await this.getRecipes();
      }, 500);
    }
  };

  destroy(): void {}
}
