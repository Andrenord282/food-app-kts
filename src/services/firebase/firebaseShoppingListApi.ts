import { collection, getDocs } from 'firebase/firestore';
import { db } from 'services/firebase/config';
import { RecipeIngredientListClient } from 'store/models/recipe';

class FirebaseShoppingListApi {
  async getList(userUid: string) {
    const list: RecipeIngredientListClient[] = [];

    const collectionRef = collection(db, `users/${userUid}/recipeShoppingList`);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      list.push(doc.data() as RecipeIngredientListClient);
    });

    return { list };
  }
}

const firebaseShoppingListApi = new FirebaseShoppingListApi();

export default firebaseShoppingListApi;
