import { RecipeApi, RecipeModel } from 'store';

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
