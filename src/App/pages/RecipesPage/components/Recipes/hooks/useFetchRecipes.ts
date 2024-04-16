import { useState } from 'react';
import { Recipe, spoonacularApi } from 'services/spoonacularApi';

type FetchState = 'loading' | 'loaded' | 'fail';

type UseFetchRecipesState = {
  fetchState: FetchState;
  recipesList: Recipe[];
  fetchRecipes: () => void;
};

const useFetchRecipes = (): UseFetchRecipesState => {
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    try {
      const { data } = await spoonacularApi.getRecipes();
      setRecipesList(data.results);
      setFetchState('loaded');
    } catch (error) {
      setFetchState('fail');
    }
  };

  return {
    fetchState,
    recipesList,
    fetchRecipes,
  };
};

export { useFetchRecipes };
