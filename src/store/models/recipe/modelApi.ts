import { FieldValue } from 'firebase/firestore';

export type RecipeOverviewListResponseApi = {
  results: RecipeApi[];
  offset: number;
  number: number;
  totalResults: number;
};

export type RecipeDetailsResponseApi = RecipeDetailsApi

export type RecipeSearchOptionApi = {
  id: number;
  title: string;
  imageType: string;
};

export type RecipeSearchParamRequestApi = {
  query?: string;
};

export type RecipeOverviewListRequestApi = {
  offset?: number;
  number?: number;
  query?: string;
  type?: string;
  cuisine?: string;
};

export type RecipeOverviewListParamRequestApi = {
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

export type RecipeDetailsApi = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredientApi[];
  nutrition: NutritionApi;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  analyzedInstructions: AnalyzedInstructionApi[];
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

type ExtendedIngredientApi = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: MeasuresApi;
};

type MeasuresApi = {
  us: MeasureApi;
  metric: MeasureApi;
};

type MeasureApi = {
  amount: number;
  unitShort: string;
  unitLong: string;
};

type AnalyzedInstructionApi = {
  name: string;
  steps: StepInstructionApi[];
};

export type StepInstructionApi = {
  number: number;
  step: string;
  ingredients: Ingredient2Api[];
  equipment: EquipmentApi[];
  length?: LengthApi;
};

type Ingredient2Api = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type EquipmentApi = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type LengthApi = {
  number: number;
  unit: string;
};
