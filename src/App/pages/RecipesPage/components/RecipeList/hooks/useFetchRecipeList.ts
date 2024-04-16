import { useState } from 'react';
import spoonacularApi, { Recipe } from 'services/spoonacularApi';

type FetchState = 'loading' | 'loaded' | 'fail';

type UseFetchRecipeListState = {
  fetchState: FetchState;
  recipeList: Recipe[];
  fetchRecipeList: () => void;
};

const useFetchRecipeList = (): UseFetchRecipeListState => {
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const fetchRecipeList = async () => {
    try {
      const { data } = await spoonacularApi.getRecipes();
      setRecipeList(data.results);
      setFetchState('loaded');
    } catch (error) {
      setFetchState('fail');
    }
  };

  return {
    fetchState,
    recipeList,
    fetchRecipeList,
  };
};

export default useFetchRecipeList;
