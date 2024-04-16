import { AxiosResponse } from 'axios';
import { SPOONACULAR_API_KEY } from 'config/services';
import { RecipeList } from './models';
import { spoonacularClient } from 'services/axios/spoonacularClient';

class SpoonacularApi {
  getRecipes = async (): Promise<AxiosResponse<RecipeList>> => {
    const response = await spoonacularClient.get('recipes/complexSearch', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeNutrition: true,
      },
    });
    return response;
  };
}

const spoonacularApi = new SpoonacularApi();

export { spoonacularApi };
