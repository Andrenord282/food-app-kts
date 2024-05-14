export type RecipeClient = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  nutrition: NutritionClient;
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
