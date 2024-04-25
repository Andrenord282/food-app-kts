import { action, makeObservable, observable } from 'mobx';
import { parse } from 'qs';

type PrivateFields = '_params';

class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(key: string): string {
    return this._params[key] as string;
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = this._search + search;
      this._params = parse(search);
    }
  }

}

export default QueryParamsStore;
