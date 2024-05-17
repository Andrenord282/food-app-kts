import { serverTimestamp } from 'firebase/firestore';
import { RecipeApi, RecipeIngredientListApi } from './modelApi';
import { RecipeClient, RecipeIngredientListClient } from './modelClient';

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

export const normalizeRecipeIngredientListClient = (from: RecipeIngredientListApi): RecipeIngredientListClient => {
  return {
    id: from.id,
    title: from.title,
    ingredients: from.ingredients,
  };
};
