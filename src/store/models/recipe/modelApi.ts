import { FieldValue } from 'firebase/firestore';

export type RecipeListParamRequest = {
  offset?: number;
  number?: number;
  query?: string;
  type?: string;
  cuisine?: string;
};

export type RecipeApi = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  dishTypes: string[];
  cuisines: string[];
  nutrition: NutritionApi;
  createdAt: FieldValue;
};

export type RecipeIngredientListApi = {
  id: number;
  title: string;
  ingredients: RecipeIngredientListItem[];
};

type RecipeIngredientListItem = {
  original: string;
  completed: boolean;
};

type NutritionApi = {
  nutrients: NutrientApi[];
  ingredients: IngredientApi[];
};

type NutrientApi = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type IngredientApi = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: NutrientApi[];
};
