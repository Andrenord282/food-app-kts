import { RecipeApi, StepInstructionApi } from 'store/models/recipes/modelsApi';
import { RecipeDetailModel, RecipeModel } from 'store/models/recipes/modelsClient';
import { RecipeSearchOptionApi } from 'store/models/recipes/recipeSearchApi';
import { RecipeSearchOptionModel } from 'store/models/recipes/recipeSearchClient';

const setEquipment = (equipments: StepInstructionApi[]): string[] => {
  if (!equipments) return [];
  const uniqEquipments = new Set<string>([]);

  equipments.forEach(({ equipment }) => {
    equipment.forEach(({ name }) => {
      uniqEquipments.add(name);
    });
  });

  return [...uniqEquipments];
};

export const normalizeRecipe = (from: RecipeApi): RecipeModel => {
  return {
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    extendedIngredients: from.extendedIngredients,
    nutrition: from.nutrition,
    vegetarian: from.vegetarian,
    vegan: from.vegan,
    glutenFree: from.glutenFree,
    dairyFree: from.dairyFree,
    veryHealthy: from.veryHealthy,
    cheap: from.cheap,
    veryPopular: from.veryPopular,
    preparationMinutes: from.preparationMinutes,
    cookingMinutes: from.cookingMinutes,
    aggregateLikes: from.aggregateLikes,
    servings: from.servings,
    summary: from.summary,
    cuisines: from.cuisines,
    dishTypes: from.dishTypes,
    analyzedInstructions: from.analyzedInstructions,
  };
};

export const normalizeRecipeDetail = (from: RecipeApi): RecipeDetailModel => {
  return {
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    extendedIngredients: from.extendedIngredients,
    nutrition: from.nutrition,
    vegetarian: from.vegetarian,
    vegan: from.vegan,
    glutenFree: from.glutenFree,
    dairyFree: from.dairyFree,
    veryHealthy: from.veryHealthy,
    cheap: from.cheap,
    veryPopular: from.veryPopular,
    preparationMinutes: from.preparationMinutes,
    cookingMinutes: from.cookingMinutes,
    aggregateLikes: from.aggregateLikes,
    servings: from.servings,
    summary: from.summary,
    cuisines: from.cuisines,
    dishTypes: from.dishTypes,
    analyzedInstructions: from.analyzedInstructions,
    equipments: setEquipment(from.analyzedInstructions[0].steps),
  };
};

export const normalizeSearchRecipe = (from: RecipeSearchOptionApi): RecipeSearchOptionModel => {
  return {
    key: from.id,
    value: from.title,
  };
};
