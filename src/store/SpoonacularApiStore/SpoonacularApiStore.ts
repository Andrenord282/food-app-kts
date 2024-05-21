import { AxiosResponse } from 'axios';
import { SPOONACULAR_API_KEY } from 'config/services';
import { spoonacularClient } from 'services/axios';
import {
  RecipeOverviewListRequestApi,
  RecipeOverviewListResponseApi,
  RecipeDetailsResponseApi,
  RecipeSearchOptionApi,
  RecipeSearchParamRequestApi,
} from 'store/models/recipe';

export default class SpoonacularApiStore {
  getRecipes = async (params: RecipeOverviewListRequestApi): Promise<AxiosResponse<RecipeOverviewListResponseApi>> => {
    const response = await spoonacularClient.get('recipes/complexSearch', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeNutrition: true,
        ...params,
      },
    });
    return response;
  };

  getRecipe = async (id: string): Promise<AxiosResponse<RecipeDetailsResponseApi>> => {
    const response = await spoonacularClient.get(`recipes/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        includeNutrition: true,
        addWinePairing: false,
        addTasteData: false,
      },
    });
    return response;
  };

  getSearchRecipe = async (params: RecipeSearchParamRequestApi): Promise<AxiosResponse<RecipeSearchOptionApi[]>> => {
    const response = await spoonacularClient.get(`recipes/autocomplete/?number=10`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        ...params,
      },
    });
    return response;
  };
}
