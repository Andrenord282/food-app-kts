import { serverTimestamp } from 'firebase/firestore';
import {
  RecipeApi,
  RecipeDetailsApi,
  RecipeIngredientListApi,
  RecipeSearchOptionApi,
  StepInstructionApi,
} from './modelApi';
import { RecipeClient, RecipeDetailsClient, RecipeIngredientListClient, RecipeSearchOptionClient } from './modelClient';

export const normalizeRecipeClient = (from: RecipeApi): RecipeClient => {
  return {
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    nutrition: from.nutrition,
    cuisines: from.cuisines,
    dishTypes: from.dishTypes,
  };
};

export const normalizeRecipeApi = (from: RecipeClient): RecipeApi => {
  return {
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    nutrition: from.nutrition,
    cuisines: from.cuisines,
    dishTypes: from.dishTypes,
    createdAt: serverTimestamp(),
  };
};

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

export const normalizeRecipeDetails = (from: RecipeDetailsApi): RecipeDetailsClient => {
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

export const normalizeRecipeIngredientListClient = (from: RecipeIngredientListApi): RecipeIngredientListClient => {
  return {
    id: from.id,
    title: from.title,
    ingredients: from.ingredients,
  };
};

export const normalizeRecipeIngredientListApi = (from: RecipeIngredientListClient): RecipeIngredientListApi => {
  return {
    id: from.id,
    title: from.title,
    ingredients: from.ingredients,
  };
};

export const normalizeSearchRecipeClient = (from: RecipeSearchOptionApi): RecipeSearchOptionClient => {
  return {
    key: from.id,
    value: from.title,
  };
};
