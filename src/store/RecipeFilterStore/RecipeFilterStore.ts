import { action, computed, makeAutoObservable, observable } from 'mobx';
import { rootStore } from 'store';
import { FilterItem } from 'store/models/recipes/recipeFilterClient';
import { TLocalStore } from 'utils';

type PrivateFields =
  | '_filterName'
  | '_filterValue'
  | '_filterOptions'
  | '_filterSelected'
  | '_initFilterSelected'
  | '_setFilterSelected'
  | '_setFilterValue';

export default class RecipeFilterStore implements TLocalStore {
  private _filterName = '';

  private _filterValue = '';

  private _filterOptions: FilterItem<string, string>[] = [];

  private _filterSelected: FilterItem<string, string>[] = [];

  constructor(name: string, options: FilterItem<string, string>[]) {
    this._filterName = name;
    this._filterValue = rootStore.query.getParam(this._filterName);
    this._filterOptions = options;
    this._filterSelected = this._initFilterSelected(this._filterValue);

    makeAutoObservable<RecipeFilterStore, PrivateFields>(this, {
      _filterName: observable,
      _filterValue: observable,
      _filterOptions: observable,
      _filterSelected: observable,
      filterValue: computed,
      filterOptions: computed,
      filterSelected: computed,
      _setFilterSelected: action,
      _setFilterValue: action,
      _initFilterSelected: action,
      updateFilter: action,
    });
  }

  get filterValue(): string {
    if (!this._filterValue) return '';
    return this._filterValue.split(',').join(', ');
  }

  get filterOptions(): FilterItem<string, string>[] {
    return this._filterOptions;
  }

  get filterSelected(): FilterItem<string, string>[] {
    return this._filterSelected;
  }

  updateFilter = (selected: FilterItem<string, string>[]) => {
    this._setFilterSelected(selected);
    this._setFilterValue(selected);
  };

  private _initFilterSelected = (value: string): FilterItem<string, string>[] => {
    if (!value) return [];
    const selected = value.split(',').map((value) => {
      return {
        key: value,
        value,
      };
    });

    return selected;
  };

  private _setFilterSelected = (selected: FilterItem<string, string>[]) => {
    this._filterSelected = selected;
  };

  private _setFilterValue = (selected: FilterItem<string, string>[]) => {
    this._filterValue = selected.map(({ value }) => value).join(', ');
    rootStore.query.updateParam({ key: this._filterName, value: this._filterValue });
  };

  destroy(): void {}
}
