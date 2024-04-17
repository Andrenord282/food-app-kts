import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { FilterRecipeList, Recipe } from 'services/spoonacularApi';

type RecipeListState = 'loading' | 'loaded' | 'fail';

type FilterValue = number | string | string[];

type Filter = Record<string, FilterValue>;

type RecipesContextType = {
  recipeListState: RecipeListState;
  recipeList: Recipe[];
  filterList: FilterRecipeList;
  handleUpdateFilter: (filter: Filter) => void;
  handleRecipeListState: (state: RecipeListState) => void;
  handleUpdateRecipeList: (list: Recipe[]) => void;
};

const RecipesContext = createContext<RecipesContextType | null>(null);

export const RecipesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [recipeListState, setRecipeListState] = useState<RecipeListState>('loading');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filterList, setFilterList] = useState<FilterRecipeList>({});

  const handleUpdateRecipeList = (list: Recipe[]) => {
    setRecipeList(list);
  };

  const handleRecipeListState = (state: RecipeListState) => {
    setRecipeListState(state);
  };

  const handleUpdateFilter = (filter: Filter) => {
    setFilterList((oldFilters) => {
      return {
        ...oldFilters,
        ...filter,
      };
    });
  };

  const value = {
    filterList,
    recipeListState,
    recipeList,
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
