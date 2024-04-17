import spoonacularApi, { FilterRecipeList, ParamRecipeList } from 'services/spoonacularApi';
import { useRecipesContext } from 'context/RecipesContext';
import { useEffect } from 'react';

type UseFetchRecipeListState = {
  fetchRecipeList: () => void;
};

const useFetchRecipeList = (): UseFetchRecipeListState => {
  const { recipeListState, filterList, handleRecipeListState, handleUpdateRecipeList } = useRecipesContext();

  const fetchRecipeList = async () => {
    try {
      const initParam = ({ type, cuisine, ...filters }: FilterRecipeList) => {
        const param: ParamRecipeList = {
          ...filters,
          number: 9,
          type: type ? type.join(',') : undefined,
          cuisine: cuisine ? cuisine.join(',') : undefined,
        };
        return param;
      };

      const param = initParam(filterList);

      const { data } = await spoonacularApi.getRecipes(param);

      handleUpdateRecipeList(data.results);
      handleRecipeListState('loaded');
      
    } catch (error) {
      handleRecipeListState('fail');
    }
  };

  useEffect(() => {
    if (recipeListState === 'loading') {
      fetchRecipeList();
    }
  }, [recipeListState]);

  return {
    fetchRecipeList,
  };
};

export default useFetchRecipeList;
