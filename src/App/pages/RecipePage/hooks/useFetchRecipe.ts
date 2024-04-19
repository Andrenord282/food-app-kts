import { useState } from 'react';
import spoonacularApi, { Recipe } from 'services/spoonacularApi';

type RecipeState = 'loading' | 'loaded' | 'fail';
type UseFetchRecipeState = {
  recipeState: RecipeState;
  recipe: Recipe | null;
  errorInfo: string;
  fetchRecipe: (id: string) => void;
};

const useFetchRecipe = (): UseFetchRecipeState => {
  const [recipeState, setResipeState] = useState<RecipeState>('loading');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [errorInfo, setErrorInfo] = useState<string>('');

  const fetchRecipe = async (id: string) => {
    try {
      const { data } = await spoonacularApi.getRecipe(id);
      setRecipe(data);
      setResipeState('loaded');
    } catch (error) {
      setResipeState('fail');
      setErrorInfo('fdf');
    }
  };

  return {
    recipeState,
    recipe,
    errorInfo,
    fetchRecipe,
  };
};

export default useFetchRecipe;
