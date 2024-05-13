import { UserApi } from './modelApi';
import { UserClient } from './modelClient';

export const normalizeUser = (from: UserApi): UserClient => {
  return {
    uid: from.uid,
    userName: from.displayName,
    recipeSavedList: new Set(from.recipeSavedList),
    recipeShoppingList: new Set(from.recipeShoppingList),
  };
};
