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
import { db } from 'services/firebase/config';
import { FilterRecipeSaveList, RecipeApi } from 'store/models/recipe';

class FirebaseSavedListApi {
  private _initRequestParam(filterList: FilterRecipeSaveList): (QueryFieldFilterConstraint | QueryOrderByConstraint)[] {
    const param: (QueryFieldFilterConstraint | QueryOrderByConstraint)[] = [];
    const title = filterList.title ? filterList.title.charAt(0).toUpperCase() + filterList.title.slice(1) : '';
    const type = filterList.type ? filterList.type.split(',') : null;
    const orderName = filterList.orderName;
    const orderType = filterList.orderType;

    title ? param.push(where('title', '>=', title)) : null;
    title ? param.push(where('title', '<', title + '\uf8ff')) : null;
    type ? param.push(where('dishTypes', 'array-contains-any', type)) : null;
    orderName && orderType ? param.push(orderBy(orderName, orderType as OrderByDirection)) : null;

    return param;
  }

  async getList(
    cursor: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
    userUid: string,
    filterList: FilterRecipeSaveList,
    page: number,
    Itemlimit: number,
  ): Promise<{
    total: number;
    list: RecipeApi[];
    cursor: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }> {
    const list: RecipeApi[] = [];
    const collectionRef = collection(db, `users/${userUid}/recipeSavedList`);
    const param = this._initRequestParam(filterList);

    const total = (await getCountFromServer(query(collectionRef, ...param))).data().count;

    if (cursor === null) {
      const q = query(collectionRef, ...param, limit(page * Itemlimit));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        list.push(doc.data() as RecipeApi);
      });

      const newCursor = querySnapshot.docs[querySnapshot.docs.length - 1];
      return {
        total,
        list,
        cursor: newCursor,
      };
    }

    const q = query(collectionRef, ...param, startAfter(cursor), limit(Itemlimit));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      list.push(doc.data() as RecipeApi);
    });

    const newCursor = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { total, list, cursor: newCursor };
  }
}

const firebaseSavedListApi = new FirebaseSavedListApi();

export default firebaseSavedListApi;
