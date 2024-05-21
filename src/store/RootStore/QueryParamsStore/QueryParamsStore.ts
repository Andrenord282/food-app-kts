import { action, makeObservable, observable } from 'mobx';
import { parse } from 'qs';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};

  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      _search: observable,
      initSearch: action,
    });
  }

  getParam(key: string): string {
    return this._params[key] as string;
  }

  initSearch(search: string): void {
    search = search.startsWith('?') ? search.slice(1) : search;
    this._search = search;
    this._params = parse(search);
  }
}
