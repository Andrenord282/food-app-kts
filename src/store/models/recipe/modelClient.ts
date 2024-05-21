export type RecipeClient = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  dishTypes: string[];
  cuisines: string[];
  nutrition: NutritionClient;
};

export type RecipeDetailsClient = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredientClient[];
  nutrition: NutritionClient;
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
  equipments: string[];
  analyzedInstructions: AnalyzedInstructionClient[];
};

export type RecipeSearchOptionClient = {
  key: number;
  value: string;
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

export type RecipeIngredientListClient = {
  id: number;
  title: string;
  ingredients: RecipeIngredientListItem[];
};

export type ExtendedIngredientClient = {
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
  measures: MeasuresClient;
};

type RecipeIngredientListItem = {
  original: string;
  completed: boolean;
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

type AnalyzedInstructionClient = {
  name: string;
  steps: StepInstructionClient[];
};

export type StepInstructionClient = {
  number: number;
  step: string;
  ingredients: Ingredient2Client[];
  equipment: EquipmentClient[];
  length?: LengthClient;
};

type Ingredient2Client = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type EquipmentClient = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type LengthClient = {
  number: number;
  unit: string;
};

type MeasuresClient = {
  us: MeasureClient;
  metric: MeasureClient;
};

type MeasureClient = {
  amount: number;
  unitShort: string;
  unitLong: string;
};
