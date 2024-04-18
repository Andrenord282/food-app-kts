export type ParamRecipe = {
  id: string;
};

export type ParamRecipeList = {
  offset?: number;
  number?: number;
  query?: string;
  type?: string;
  cuisine?: string;
};

export type ResponseRecipeList = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
};

export type FilterRecipeList = {
  query?: string;
  type?: string[];
  cuisine?: string[];
};

export type CursorRecipeList = {
  offset: number;
  number: number;
  totalResults: number;
};

export type Recipe = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredient[];
  nutrition: Nutrition;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  // gaps: string;
  preparationMinutes: number;
  // cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  analyzedInstructions: AnalyzedInstruction[];
};

export type ExtendedIngredient = {
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
  measures: Measures;
};

type AnalyzedInstruction = {
  name: string;
  steps: StepInstruction[];
};

export type StepInstruction = {
  number: number;
  step: string;
  ingredients: Ingredient2[];
  equipment: Equipment[];
  length?: Length;
};

type Ingredient2 = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type Equipment = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type Length = {
  number: number;
  unit: string;
};

type Nutrition = {
  nutrients: Nutrient[];
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type Measures = {
  us: Us;
  metric: Metric;
};
type Us = {
  amount: number;
  unitShort: string;
  unitLong: string;
};
type Metric = {
  amount: number;
  unitShort: string;
  unitLong: string;
};
