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
  nutrition: Nutrition;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  servings: number;
  sourceUrl: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  license?: string;
};

type Nutrition = {
  nutrients: Nutrient[];
  properties: Property[];
  flavonoids: Property[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
};

type WeightPerServing = {
  amount: number;
  unit: string;
};

type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
};

type Property = {
  name: string;
  amount: number;
  unit: string;
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};
