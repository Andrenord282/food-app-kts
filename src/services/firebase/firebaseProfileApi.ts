import {
  doc,
  collection,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentData,
} from 'firebase/firestore';
import { db } from 'services/firebase/config';
import { RecipeApi, RecipeIngredientListApi } from 'store/models/recipe';
import { UserApi } from 'store/models/user';

class FirebaseProfileApi {
  private _addRecipeIdToSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdSavedList: arrayUnion(id),
    });
  };

  private _addRecipeToSavedList = async (userUid: string, recipe: RecipeApi) => {
    const docRef = doc(db, `users`, userUid);
    const collectionRef = collection(docRef, 'recipeSavedList');
    await setDoc(doc(collectionRef, String(recipe.id)), recipe);
  };

  private _removeRecipeIdFromSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdSavedList: arrayRemove(id),
    });
  };

  private _removeRecipeFromSavedList = async (userUid: string, id: number) => {
    const docRef = doc(db, `users/${userUid}/recipeSavedList`, String(id));
    await deleteDoc(docRef);
  };

  private _addRecipeToShoppingList = async (userUid: string, recipeingredients: RecipeIngredientListApi) => {
    const docRef = doc(db, `users`, userUid);
    const collectionRef = collection(docRef, 'recipeShoppingList');
    await setDoc(doc(collectionRef, String(recipeingredients.id)), recipeingredients);
  };

  private _addRecipeIdToShoppingList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdShoppingList: arrayUnion(id),
    });
  };

  private _removeRecipeFromShoppingList = async (userUid: string, id: number) => {
    const docRef = doc(db, `users/${userUid}/recipeShoppingList`, String(id));
    await deleteDoc(docRef);
  };

  private _removeRecipeIdFromShoppingList = async (userUid: string, id: number) => {
    const docRef = doc(db, 'users', userUid);
    await updateDoc(docRef, {
      recipeIdShoppingList: arrayRemove(id),
    });
  };

  initProfile = async (uid: string) => {
    let requestTry = 3;
    const userRef = doc(db, 'users', uid);
    let profile: DocumentData | undefined;
    while (requestTry !== 0) {
      const response = await getDoc(userRef);
      if (response.exists()) {
        profile = response.data();
        break;
      }
      requestTry--;
    }
    return profile as UserApi;
  };

  saveToSavedList = async (userUid: string, recipe: RecipeApi) => {
    await this._addRecipeIdToSavedList(userUid, recipe.id);
    await this._addRecipeToSavedList(userUid, recipe);
  };

  removeFromSavedList = async (userUid: string, id: number) => {
    await this._removeRecipeIdFromSavedList(userUid, id);
    await this._removeRecipeFromSavedList(userUid, id);
  };

  saveToShoppingList = async (userUid: string, recipeingredients: RecipeIngredientListApi) => {
    await this._addRecipeIdToShoppingList(userUid, recipeingredients.id);
    await this._addRecipeToShoppingList(userUid, recipeingredients);
  };

  removeFromShoppingList = async (userUid: string, id: number) => {
    await this._removeRecipeIdFromShoppingList(userUid, id);
    await this._removeRecipeFromShoppingList(userUid, id);
  };
}
const firebaseProfileApi = new FirebaseProfileApi();

export default firebaseProfileApi;
