export type UserClient = {
  uid: string;
  userName: string;
  recipeSavedList: Set<number>;
  recipeShoppingList: Set<string>;
};
