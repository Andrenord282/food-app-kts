import { AxiosError } from 'axios';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { rootStore, IntervalStore, SpoonacularApiStore } from 'store';
import { RecipeSearchOptionApi, RecipeSearchParamRequestApi, RecipeSearchOptionClient,  normalizeSearchRecipeClient } from 'store/models/recipe';
import { normalizeArray } from 'store/models/shared';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_meta' | '_searchName' | '_searchValue' | '_searchOptions' | '_isEmpty' | '_setSearchValue';

export default class RecipeSearchStore implements TLocalStore {
  private readonly _apiStore = new SpoonacularApiStore();

  private readonly _intervalStore = new IntervalStore();

  private _meta: Meta = Meta.initial;

  private _searchName = '';

  private _searchValue = '';

  private _searchOptions: RecipeSearchOptionClient[] = [];

  private _isEmpty: boolean = false;

  constructor(name: string) {
    this._searchName = name;

    makeAutoObservable<RecipeSearchStore, PrivateFields>(this, {
      _meta: observable,
      _searchName: observable,
      _searchValue: observable,
      _searchOptions: observable.ref,
      _isEmpty: observable,
      meta: computed,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isError: computed,
      isEmpty: computed,
      searchOptions: computed,
      searchValue: computed,
      _setSearchValue: action,
      getSearchRecipe: action,
      updateSearchValue: action,
      resetSearchOptions: action,
      selectSearchValue: action,
    });
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

  get isEmpty(): boolean {
    return this._isEmpty;
  }

  get searchOptions(): RecipeSearchOptionClient[] {
    return this._searchOptions;
  }

  get searchValue(): string {
    // if (!this._searchValue) return rootStore.query.getParam(this._searchName);
    return this._searchValue;
  }

  private _initRequestParam() {
    const param: RecipeSearchParamRequestApi = {
      [this._searchName]: this._searchValue,
    };
    return param;
  }

  private async _request() {
    const param = this._initRequestParam();
    return await this._apiStore.getSearchRecipe(param);
  }

  private _setSearchValue = (value: string) => {
    this._searchValue = value;
  };

  getSearchRecipe = async () => {
    try {
      this._meta = Meta.loading;
      this._searchOptions = [];

      const { data } = await this._request();
      runInAction(() => {
        if (data.length === 0) {
          this._isEmpty = true;
          this._meta = Meta.success;
          return;
        }

        this._searchOptions = [
          { key: new Date().getMilliseconds(), value: this._searchValue },
          ...normalizeArray<RecipeSearchOptionApi, RecipeSearchOptionClient>(data, normalizeSearchRecipeClient),
        ];
        this._isEmpty = false;
        this._meta = Meta.success;
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        this._meta = Meta.error;
      }
    }
  };

  selectSearchValue = (value: string) => {
    this._setSearchValue(value);
  };

  updateSearchValue = (value: string) => {
    this._searchValue = value;

    this._intervalStore.startTimeout(async () => {
      runInAction(() => {
        if (!this._searchValue) return;
      });

      await this.getSearchRecipe();
    }, 400);
  };

  resetSearchOptions = () => {
    this._searchOptions = [];
    this._isEmpty = false;
  };

  destroy(): void {}
}
