import { collection, getDocs } from 'firebase/firestore';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { db } from 'services/firebase/config';
import { RecipeIngredientListClient, normalizeRecipeIngredientListClient } from 'store/models/recipe';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared';

import { Meta, TLocalStore } from 'utils';
import { rootStore } from '..';

type PrivateFields = '_userUid' | '_meta' | '_list';

export default class RecipeShoppingListStore implements TLocalStore {
  private _userUid = rootStore.user.userUid;

  private _meta: Meta = Meta.initial;

  private _list: CollectionModel<number, RecipeIngredientListClient> = getInitialCollectionModel();

  constructor() {
    makeAutoObservable<RecipeShoppingListStore, PrivateFields>(this, {
      _userUid: observable,
      _meta: observable,
      _list: observable,
      isLoading: computed,
      isInitial: computed,
      isSuccess: computed,
      isEmpty: computed,
      list: computed,
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

  get list(): RecipeIngredientListClient[] {
    return linearizeCollection<number, RecipeIngredientListClient>(this._list);
  }

  private async _request(): Promise<{
    list: RecipeIngredientListClient[];
  }> {
    const list: RecipeIngredientListClient[] = [];

    const collectionRef = collection(db, `users/${this._userUid}/recipeShoppingList`);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      list.push(doc.data() as RecipeIngredientListClient);
    });

    return { list };
  }

  getList = async () => {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const { list } = await this._request();

    runInAction(() => {
      this._list = normalizeCollection<number, RecipeIngredientListClient, RecipeIngredientListClient>(
        list,
        (element) => element.id,
        normalizeRecipeIngredientListClient,
      );
      this._meta = Meta.success;
    });
  };

  destroy(): void {}
}
