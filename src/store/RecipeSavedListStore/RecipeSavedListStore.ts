import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  getCountFromServer,
} from 'firebase/firestore';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { db } from 'services/firebase/config';
import { rootStore } from 'store';
import { RecipeApi, RecipeClient, normalizeRecipeClient } from 'store/models/recipe';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_meta' | '_list' | '_page' | '_limit' | '_offset';
const RECIPES_LIMIT = 9;

export default class RecipeSavedListStore implements TLocalStore {
  private _userUid = rootStore.user.userUid;

  private _meta: Meta = Meta.initial;

  private _list: CollectionModel<number, RecipeClient> = getInitialCollectionModel();

  private _page: number = rootStore.query.getParam('page') ? Number(rootStore.query.getParam('page')) : 1;

  private _limit = RECIPES_LIMIT;

  private _cursorItem: QueryDocumentSnapshot<DocumentData, DocumentData> | null = null;

  private _total: number = 0;

  constructor() {
    makeAutoObservable<RecipeSavedListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable,
      _page: observable,
      _limit: observable,
      _offset: observable,
      isInitial: computed,
      isLoading: computed,
      isSuccess: computed,
      isEmpty: computed,
      list: computed,
      limit: computed,
      getList: action,
    });
  }

  get isInitial(): boolean {
    return this._meta === Meta.initial;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  get isEmpty(): boolean {
    return this._meta === Meta.success && this._list.order.length === 0;
  }

  get list(): RecipeClient[] {
    return linearizeCollection<number, RecipeClient>(this._list);
  }

  get limit(): number {
    return this._limit;
  }

  get total(): number {
    return this._total;
  }

  private async _request(): Promise<{
    total: number;
    list: RecipeApi[];
    cursorItem: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }> {
    const list: RecipeApi[] = [];
    const collectionRef = collection(db, `users/${this._userUid}/recipeSavedList`);

    if (this._cursorItem === null) {
      const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(this._limit));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push(doc.data() as RecipeApi);
      });
      const total = (await getCountFromServer(query(collectionRef, orderBy('createdAt', 'desc')))).data().count;
      const cursorItem = querySnapshot.docs[querySnapshot.docs.length - 1];

      return {
        total,
        list,
        cursorItem,
      };
    }

    const q = query(collectionRef, orderBy('createdAt', 'desc'), startAfter(this._cursorItem), limit(this._limit));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as RecipeApi);
    });
    const total = (await getCountFromServer(query(collectionRef, orderBy('createdAt', 'desc')))).data().count;
    const cursorItem = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { total, list, cursorItem };
  }

  getList = async (option: { resetPage?: boolean } = {}) => {
    try {
      const { resetPage = false } = option;
      this._meta = Meta.loading;
      const { total, list, cursorItem } = await this._request();
      runInAction(() => {
        const newItems = normalizeCollection<number, RecipeApi, RecipeClient>(
          list,
          (element) => element.id,
          normalizeRecipeClient,
        );
        this._list.entities = { ...this._list.entities, ...newItems.entities };
        this._list.order = [...this._list.order, ...newItems.order];
        this._cursorItem = cursorItem;
        this._total = total;
        this._meta = Meta.success;
      });
    } catch (error) {
      console.log('getList', error);
    }
  };

  destroy(): void {}
}
