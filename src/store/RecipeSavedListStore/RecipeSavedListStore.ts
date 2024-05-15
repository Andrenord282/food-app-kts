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
  where,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  OrderByDirection,
} from 'firebase/firestore';
import { IReactionDisposer, action, computed, makeAutoObservable, observable, reaction, runInAction } from 'mobx';
import { db } from 'services/firebase/config';
import { IntervalStore, rootStore } from 'store';
import {
  FilterRecipeSaveList,
  FilterRecipeSaveSchema,
  RecipeApi,
  RecipeClient,
  normalizeRecipeClient,
} from 'store/models/recipe';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';
import { Meta, TLocalStore } from 'utils';

type PrivateFields = '_meta' | '_list' | '_filterList' | '_page' | '_limit' | '_total' | '_cursor' | '_updatePage';
const RECIPES_LIMIT = 9;

export default class RecipeSavedListStore implements TLocalStore {
  private readonly _intervalStore = new IntervalStore();

  private _userUid = rootStore.user.userUid;

  private _meta: Meta = Meta.initial;

  private _list: CollectionModel<number, RecipeClient> = getInitialCollectionModel();

  private _page: number = rootStore.query.getParam('page') ? Number(rootStore.query.getParam('page')) : 1;

  private _limit = RECIPES_LIMIT;

  private _total: number = 0;

  private _cursor: QueryDocumentSnapshot<DocumentData, DocumentData> | null = null;

  private _filterList: FilterRecipeSaveList = {
    title: rootStore.query.getParam('query') || '',
    type: rootStore.query.getParam('type') || '',
    orderName: rootStore.query.getParam('order-name'),
    orderType: rootStore.query.getParam('order-type'),
  };

  constructor() {
    makeAutoObservable<RecipeSavedListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable,
      _page: observable,
      _limit: observable,
      _total: observable,
      _cursor: observable,
      _filterList: observable,
      isInitial: computed,
      isLoading: computed,
      isSuccess: computed,
      isEmpty: computed,
      list: computed,
      limit: computed,
      page: computed,
      total: computed,
      _updatePage: action,
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

  get page(): number {
    return this._page;
  }

  get total(): number {
    return this._total;
  }

  get filterList(): FilterRecipeSaveSchema<string, string> {
    const initOrderName = (value: string) => {
      if (value === 'title') return 'order by title';
      if (value === 'createdAt') return 'order by add';
      return '';
    };

    const initOrderType = (value: string) => {
      if (value === 'asc') return 'asc';
      if (value === 'desc') return 'desc';
      return 'asc';
    };

    return {
      title: !this._filterList.title ? '' : this._filterList.title,
      type: !this._filterList.type
        ? []
        : this._filterList.type.split(',').map((string) => ({ key: string, value: string })),
      orderName: initOrderName(this._filterList.orderName),
      orderType: initOrderType(this._filterList.orderType),
    };
  }

  private _initRequestParam(): (QueryFieldFilterConstraint | QueryOrderByConstraint)[] {
    const param: (QueryFieldFilterConstraint | QueryOrderByConstraint)[] = [];
    const title = this._filterList.title
      ? this._filterList.title.charAt(0).toUpperCase() + this._filterList.title.slice(1)
      : '';
    const type = this._filterList.type ? this._filterList.type.split(',') : null;
    const orderName = this._filterList.orderName;
    const orderType = this._filterList.orderType;

    title ? param.push(where('title', '>=', title)) : null;
    title ? param.push(where('title', '<', title + '\uf8ff')) : null;
    type ? param.push(where('dishTypes', 'array-contains-any', type)) : null;
    orderName && orderType ? param.push(orderBy(orderName, orderType as OrderByDirection)) : null;

    return param;
  }

  private async _request(): Promise<{
    total: number;
    list: RecipeApi[];
    cursor: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }> {
    const list: RecipeApi[] = [];
    const collectionRef = collection(db, `users/${this._userUid}/recipeSavedList`);
    const param = this._initRequestParam();

    const total = (await getCountFromServer(query(collectionRef, ...param))).data().count;

    if (this._cursor === null) {
      const q = query(collectionRef, ...param, limit(this._page * this._limit));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        list.push(doc.data() as RecipeApi);
      });

      const cursor = querySnapshot.docs[querySnapshot.docs.length - 1];
      return {
        total,
        list,
        cursor,
      };
    }

    const q = query(collectionRef, ...param, startAfter(this._cursor), limit(this._limit));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      list.push(doc.data() as RecipeApi);
    });

    const cursor = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { total, list, cursor };
  }

  private _updatePage(page: number) {
    this._page = page;
  }

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('page'),
    async (page) => {
      if (page) {
        this._updatePage(Number(page));
        await this.getList();
      }
    },
  );

  private readonly _queryNameReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('query'),
    async (query) => {
      this._intervalStore.startTimeout(async () => {
        this._filterList.title = query;
        await this.getList({ resetPage: true });
      }, 400);
    },
  );

  private readonly _queryTypeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    async (type) => {
      this._filterList.type = type;
      if (!type) {
        await this.getList({ resetPage: true });
      }
    },
  );

  private readonly _queryOrderNameReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('order-name'),
    async (orderName) => {
      this._filterList.orderName = orderName || 'title';
      await this.getList({ resetPage: true });
    },
  );

  private readonly _queryOrderTypeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('order-type'),
    async (orderType) => {
      if (orderType) {
        this._filterList.orderType = orderType;
        await this.getList({ resetPage: true });
      }
    },
  );

  getList = async (option: { resetPage?: boolean } = {}) => {
    try {
      const { resetPage = false } = option;
      this._meta = Meta.loading;
      if (resetPage) {
        this._updatePage(1);
        this._list = getInitialCollectionModel();
        this._cursor = null;
      }

      const { total, list, cursor } = await this._request();

      runInAction(() => {
        const newItems = normalizeCollection<number, RecipeApi, RecipeClient>(
          list,
          (element) => element.id,
          normalizeRecipeClient,
        );
        this._list.entities = { ...this._list.entities, ...newItems.entities };
        this._list.order = [...this._list.order, ...newItems.order];
        this._cursor = cursor;
        this._total = total;
        this._meta = Meta.success;
      });
    } catch (error) {
      console.log('getList', error);
    }
  };

  destroy(): void {}
}
