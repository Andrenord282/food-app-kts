export type UserClient = {
  uid: string;
  userName: string;
  recipeIdSavedList: Set<number>;
  recipeShoppingList: Set<string>;
};
