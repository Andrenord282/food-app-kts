import { AxiosResponse } from 'axios';
import { SPOONACULAR_API_KEY } from 'config/services';
import spoonacularClient from 'services/axios/spoonacularClient';
import {
  RecipeOverviewListParamRequestApi,
  RecipeDetailsResponseApi,
  RecipeOverviewListResponseApi,
} from 'store/models/recipe';

class SpoonacularApi {
  getRecipes = async (
    params: RecipeOverviewListParamRequestApi | null,
  ): Promise<AxiosResponse<RecipeOverviewListResponseApi>> => {
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
}

const spoonacularApi = new SpoonacularApi();

export default spoonacularApi;
