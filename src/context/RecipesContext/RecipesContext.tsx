import { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { ErrorResponse } from 'services/axios/types';
import { CursorRecipeList, FilterRecipeList, Recipe } from 'services/spoonacularApi';

type RecipeListState = 'loading' | 'loaded' | 'fail' | 'empty' | 'init';

type RecipesContextType = {
  recipeListState: RecipeListState;
  recipeList: Recipe[];
  cursorList: CursorRecipeList;
  filterList: FilterRecipeList;
  errorInfo: ErrorResponse | null;
  handleUpdateCursor: (cursor: CursorRecipeList) => void;
  handleUpdateFilter: (filter: FilterRecipeList) => void;
  handleRecipeListState: (state: RecipeListState) => void;
  handleUpdateRecipeList: (list: Recipe[]) => void;
  handleSetError: (error: ErrorResponse) => void;
};

const NUMBER_RECIPES = 9;

const RecipesContext = createContext<RecipesContextType | null>(null);

export const RecipesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [recipeListState, setRecipeListState] = useState<RecipeListState>('loading');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [errorInfo, setErrorInfo] = useState<ErrorResponse | null>(null);
  const [cursorList, setCursorList] = useState<CursorRecipeList>({
    offset: 0,
    number: NUMBER_RECIPES,
    totalResults: 0,
  });

  const [filterList, setFilterList] = useState<FilterRecipeList>({});

  const handleUpdateRecipeList = useCallback((list: Recipe[]) => {
    setRecipeList(list);
  }, []);

  const handleRecipeListState = useCallback((state: RecipeListState) => {
    setRecipeListState(state);
  }, []);

  const handleUpdateCursor = useCallback((cursor: CursorRecipeList) => {
    setCursorList((oldCursor) => ({
      ...oldCursor,
      ...cursor,
    }));
  }, []);

  const handleUpdateFilter = useCallback((filter: FilterRecipeList) => {
    setFilterList((oldFilter) => ({
      ...oldFilter,
      ...filter,
    }));
  }, []);

  const handleSetError = useCallback((error: ErrorResponse) => {
    setErrorInfo(error);
  }, []);

  const value = {
    cursorList,
    filterList,
    recipeListState,
    recipeList,
    errorInfo,
    handleUpdateCursor,
    handleUpdateFilter,
    handleRecipeListState,
    handleUpdateRecipeList,
    handleSetError,
  };

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
};

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error('useRecipesContext has to be used within <RecipesContext.Provider>');
  }

  return context;
};
