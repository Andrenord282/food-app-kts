export type UserApi = {
  uid: string;
  displayName: string;
  recipeIdSavedList: number[];
  recipeIdShoppingList: number[];
};

export type SignUpData = {
  displayName: string;
  email: string;
  password: string;
};


export type SignInData = {
  email: string;
  password: string;
};