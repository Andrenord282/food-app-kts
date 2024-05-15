import { action, makeObservable, observable, toJS } from 'mobx';
import { parse, stringify } from 'qs';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};

  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      _search: observable,
      initSearch: action,
      updateParam: action,
    });
  }

  getParam(key: string): string {
    return this._params[key] as string;
  }

  initSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;
    this._search = search;
    this._params = parse(search);
  }

  updateParam({ key, value }: { key: string; value: string }) {
    const search = this._search.startsWith('?') ? this._search.slice(1) : this._search;
    const params = parse(search);

    value ? (params[key] = value.replace(/ /g, '+')) : delete params[key];

    this._search = stringify(params, { addQueryPrefix: true });
    this._params = parse(this._search.replace(/\?/g, ''));
    const url = decodeURIComponent(`${window.location.pathname}${this._search}${window.location.hash}`);
    window.history.replaceState({}, '', url);
  }
}
