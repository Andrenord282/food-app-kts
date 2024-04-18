import { useState } from 'react';
import spoonacularApi, { Recipe } from 'services/spoonacularApi';

type RecipeState = 'loading' | 'loaded' | 'fail';
type UseFetchRecipeState = {
  recipeState: RecipeState;
  recipe: Recipe | null;
  fetchRecipe: (id: string) => void;
};

const useFetchRecipe = (): UseFetchRecipeState => {
  const [recipeState, setResipeState] = useState<RecipeState>('loading');
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const fetchRecipe = async (id: string) => {
    try {
      const { data } = await spoonacularApi.getRecipe(id);
      setRecipe(data);
      setResipeState('loaded');
    } catch (error) {
      setResipeState('fail');
    }
  };

  return {
    recipeState,
    recipe,
    fetchRecipe,
  };
};

export default useFetchRecipe;
