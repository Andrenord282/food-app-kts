import { UserApi } from './modelApi';
import { UserClient } from './modelClient';

export const normalizeUser = (from: UserApi): UserClient => {
  return {
    uid: from.uid,
    userName: from.displayName,
    recipeIdSavedList: new Set(from.recipeIdSavedList),
    recipeIdShoppingList: new Set(from.recipeIdShoppingList),
  };
};
