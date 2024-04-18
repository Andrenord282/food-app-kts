import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { CursorRecipeList, FilterRecipeList, Recipe } from 'services/spoonacularApi';

type RecipeListState = 'loading' | 'loaded' | 'fail';

type RecipesContextType = {
  recipeListState: RecipeListState;
  recipeList: Recipe[];
  cursorList: CursorRecipeList;
  filterList: FilterRecipeList;
  handleUpdateCursor: (cursor: CursorRecipeList) => void;
  handleUpdateFilter: (filter: FilterRecipeList) => void;
  handleRecipeListState: (state: RecipeListState) => void;
  handleUpdateRecipeList: (list: Recipe[]) => void;
};

const NUMBER_RECIPES = 9;

const RecipesContext = createContext<RecipesContextType | null>(null);

export const RecipesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [recipeListState, setRecipeListState] = useState<RecipeListState>('loading');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [cursorList, setCursorList] = useState<CursorRecipeList>({
    offset: 0,
    number: NUMBER_RECIPES,
    totalResults: 0,
  });
  const [filterList, setFilterList] = useState<FilterRecipeList>({});

  const handleUpdateRecipeList = (list: Recipe[]) => {
    setRecipeList(list);
  };

  const handleRecipeListState = (state: RecipeListState) => {
    setRecipeListState(state);
  };

  const handleUpdateCursor = (cursor: CursorRecipeList) => {
    setCursorList((oldCursor) => ({
      ...oldCursor,
      ...cursor,
    }));
  };

  const handleUpdateFilter = (filter: FilterRecipeList) => {
    setFilterList((oldFilter) => ({
      ...oldFilter,
      ...filter,
    }));
  };

  const value = {
    cursorList,
    filterList,
    recipeListState,
    recipeList,
    handleUpdateCursor,
    handleUpdateFilter,
    handleRecipeListState,
    handleUpdateRecipeList,
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
