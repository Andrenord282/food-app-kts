import { AxiosResponse } from 'axios';
import { SPOONACULAR_API_KEY } from 'config/services';
import { ParamRecipe, ParamRecipeList, Recipe, ResponseRecipeList } from './models';
import spoonacularClient from 'services/axios/spoonacularClient';

class SpoonacularApi {
  getRecipes = async (params: ParamRecipeList | null): Promise<AxiosResponse<ResponseRecipeList>> => {
    const response = await spoonacularClient.get('recipes/complexSearch', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeNutrition: true,
        ...params,
      },
    });
    return response;
  };

  getRecipe = async (id: string): Promise<AxiosResponse<Recipe>> => {
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
