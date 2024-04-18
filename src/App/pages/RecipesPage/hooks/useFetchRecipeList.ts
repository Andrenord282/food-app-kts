import { useEffect } from 'react';
import { useRecipesContext } from 'context/RecipesContext';
import spoonacularApi, { CursorRecipeList, FilterRecipeList, ParamRecipeList } from 'services/spoonacularApi';

type UseFetchRecipeListState = {
  fetchRecipeList: () => void;
};

const LIMIT_OFFSET = 900;

const useFetchRecipeList = (): UseFetchRecipeListState => {
  const { recipeListState, cursorList, filterList, handleRecipeListState, handleUpdateCursor, handleUpdateRecipeList } =
    useRecipesContext();

  const fetchRecipeList = async () => {
    try {
      const initParam = (cursor: CursorRecipeList, filter: FilterRecipeList) => {
        const { offset, number } = cursor;
        const { query, type, cuisine } = filter;

        const param: ParamRecipeList = {
          offset,
          number,
          ...filter,
          query: query ? query : undefined,
          type: type ? type.join(',') : undefined,
          cuisine: cuisine ? cuisine.join(',') : undefined,
        };
        return param;
      };

      const param = initParam(cursorList, filterList);

      const { data } = await spoonacularApi.getRecipes(param);

      const { offset, number, results } = data;

      handleUpdateCursor({ offset, number, totalResults: LIMIT_OFFSET + number });
      handleUpdateRecipeList(results);
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
