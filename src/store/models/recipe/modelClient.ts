export type RecipeClient = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  dishTypes: string[];
  cuisines: string[];
  nutrition: NutritionClient;
};

export type FilterRecipeOverviewList = {
  query: string;
  type: string;
  cuisine: string;
};

export type FilterRecipeSaveList = {
  title: string;
  type: string;
  orderName: string;
  orderType: string;
};

export type FilterRecipeSaveSchema<T, U> = {
  title: T;
  type: { key: U; value: T }[];
  orderName: T;
  orderType: T;
};

export type FilterItem<U, T> = {
  key: U;
  value: T;
};

type NutritionClient = {
  nutrients: NutrientClient[];
  ingredients: IngredientClient[];
};

type NutrientClient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type IngredientClient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: NutrientClient[];
};
