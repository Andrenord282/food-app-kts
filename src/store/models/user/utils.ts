import { UserApi } from './modelApi';
import { UserClient } from './modelClient';

export const normalizeUser = (from: UserApi): UserClient => {
  return {
    uid: from.uid,
    userName: from.displayName,
    recipeIdSavedList: new Set(from.recipeIdSavedList),
    recipeShoppingList: new Set(from.recipeShoppingList),
  };
};
