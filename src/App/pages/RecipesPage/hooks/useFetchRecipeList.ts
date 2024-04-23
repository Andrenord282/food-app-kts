import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useRecipesContext } from 'context';
import spoonacularApi, { CursorRecipeList, FilterRecipeList, ParamRecipeList } from 'services/spoonacularApi';

type UseFetchRecipeListState = {
  fetchRecipeList: () => void;
};

const LIMIT_OFFSET = 900;

const useFetchRecipeList = (): UseFetchRecipeListState => {
  const {
    recipeListState,
    cursorList,
    filterList,
    handleRecipeListState,
    handleUpdateCursor,
    handleUpdateRecipeList,
    handleSetError,
  } = useRecipesContext();

  const fetchRecipeList = useCallback(async () => {
    try {
      const initParam = (cursor: CursorRecipeList, filter: FilterRecipeList) => {
        const { offset, number } = cursor;
        const { type, cuisine } = filter;

        const param: ParamRecipeList = {
          offset,
          number,
          ...filter,
          type: type ? type.join(',') : undefined,
          cuisine: cuisine ? cuisine.join(',') : undefined,
        };
        return param;
      };

      const param = initParam(cursorList, filterList);

      const { data } = await spoonacularApi.getRecipes(param);

      const { offset, number, results } = data;

      if (results.length === 0) {
        handleRecipeListState('empty');
        return;
      }
      handleUpdateCursor({ offset, number, totalResults: LIMIT_OFFSET + number });
      handleUpdateRecipeList(results);
      handleRecipeListState('loaded');
    } catch (error) {
      if (error instanceof AxiosError) {
        handleSetError(error.response?.data);
        handleRecipeListState('fail');
      }
    }
  }, [cursorList, filterList, handleRecipeListState, handleUpdateCursor, handleUpdateRecipeList, handleSetError]);

  useEffect(() => {
    if (recipeListState === 'init' || recipeListState === 'loading') {
      // fetchRecipeList();
    }
  }, [recipeListState, fetchRecipeList]);

  return {
    fetchRecipeList,
  };
};

export default useFetchRecipeList;
