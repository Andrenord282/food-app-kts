export type RecipesResponseApi = {
  results: RecipeApi[];
  offset: number;
  number: number;
  totalResults: number;
};

export type RecipeResponseApi = RecipeApi;

export type FilterRecipes = {
  query: string | undefined;
  type: string | undefined;
  cuisine: string | undefined;
};

export type FilterRecipesSchema<T, U> = {
  query: T;
  type: { key: U; value: T }[];
  cuisine: { key: U; value: T }[];
};

export type RecipeParamRequest = {
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

type NutritionApi = {
  nutrients: NutrientApi[];
  ingredients: IngredientApi[];
};

type IngredientApi = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: NutrientApi[];
};

type NutrientApi = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
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

type AnalyzedInstructionApi = {
  name: string;
  steps: StepInstructionApi[];
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
