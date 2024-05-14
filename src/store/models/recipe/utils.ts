import { serverTimestamp } from 'firebase/firestore';
import { RecipeApi } from './modelApi';
import { RecipeClient } from './modelClient';
export const normalizeRecipeClient = (from: RecipeApi): RecipeClient => {
  return {
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    nutrition: from.nutrition,
  };
};

export const normalizeRecipeApi = (from: RecipeClient): RecipeApi => {
  return {
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    nutrition: from.nutrition,
    createdAt: serverTimestamp(),
  };
};
