export type UserClient = {
  uid: string;
  userName: string;
  recipeIdSavedList: Set<number>;
  recipeIdShoppingList: Set<number>;
};
