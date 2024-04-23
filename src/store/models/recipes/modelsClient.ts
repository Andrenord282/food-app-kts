export type RecipeModel = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredientModel[];
  nutrition: NutritionModel;
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
  analyzedInstructions: AnalyzedInstructionModel[];
};

export type ExtendedIngredientModel = {
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
  measures: MeasuresModel;
};

type AnalyzedInstructionModel = {
  name: string;
  steps: StepInstructionModel[];
};

export type StepInstructionModel = {
  number: number;
  step: string;
  ingredients: Ingredient2Model[];
  equipment: EquipmentModel[];
  length?: LengthModel;
};

type Ingredient2Model = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type EquipmentModel = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

type LengthModel = {
  number: number;
  unit: string;
};

type NutritionModel = {
  nutrients: NutrientModel[];
  ingredients: IngredientModel[];
};

type IngredientModel = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: NutrientModel[];
};

type NutrientModel = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type MeasuresModel = {
  us: MeasureModel;
  metric: MeasureModel;
};

type MeasureModel = {
  amount: number;
  unitShort: string;
  unitLong: string;
};
