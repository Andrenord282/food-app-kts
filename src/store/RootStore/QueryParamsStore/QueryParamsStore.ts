import { action, makeObservable, observable } from 'mobx';
import { parse, stringify } from 'qs';

type PrivateFields = '_params' | '_search' | '_initSearch' | '_updateSearch';

class QueryParamsStore {
  private _params: qs.ParsedQs = {};

  private _search: string = '';

  constructor() {
    this._search = window.location.search;
    this._initSearch(this._search);

    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      _initSearch: action,
      _updateSearch: action,
      updateParam: action,
    });
  }

  getParam(key: string): string {
    return this._params[key] as string;
  }

  private _initSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = parse(search);
    }
  }

  private _updateSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;
    this._params = parse(search);
    this._search = search.replace(/ /g, '+').replace(/,\s*/g, ',');
    const url = `${window.location.pathname}?${search}${window.location.hash}`;
    window.history.pushState({}, '', url);
  }

  updateParam({ key, value }: { key: string; value: string }) {
    this._params[key] = value;
    const search = stringify(this._params, { addQueryPrefix: true });
    this._updateSearch(search);
  }
}

export default QueryParamsStore;
