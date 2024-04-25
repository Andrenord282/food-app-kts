import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { ErrorResponse } from 'services/axios';
import { RecipesStore } from 'store';
import { FilterRecipes } from 'store/models/recipes/modelsApi';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { useLocalStore } from 'utils';

type RecipesStoreContextTypes = {
  isInitial: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty: boolean;
  limit: number;
  total: number;
  page: number;
  recipes: RecipeModel[];
  filter: FilterRecipes;
  error: ErrorResponse | null;
  getRecipes: () => Promise<void>;
  setFilter: (key: keyof FilterRecipes, type: string) => void;
  updatePage: (page: number) => void;
};

const RecipesStoreContext = createContext<RecipesStoreContextTypes | null>(null);

export const RecipesStoreProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipesStore = useLocalStore(() => new RecipesStore());

  const {
    isInitial,
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    limit,
    total,
    page,
    recipes,
    filter,
    error,
    getRecipes,
    setFilter,
    updatePage,
  } = recipesStore;

  const value = useMemo(
    () => ({
      isInitial,
      isLoading,
      isSuccess,
      isError,
      isEmpty,
      limit,
      total,
      page,
      recipes,
      filter,
      error,
      getRecipes,
      setFilter,
      updatePage,
    }),
    [
      isInitial,
      isLoading,
      isSuccess,
      isError,
      isEmpty,
      limit,
      total,
      page,
      recipes,
      filter,
      error,
      getRecipes,
      setFilter,
      updatePage,
    ],
  );

  return <RecipesStoreContext.Provider value={value}>{children}</RecipesStoreContext.Provider>;
});

export const useRecipesStoreContext = () => {
  const context = useContext(RecipesStoreContext);

  if (!context) {
    throw new Error('useRecipesContext has to be used within <RecipesStoreContext.Provider>');
  }

  return context;
};
