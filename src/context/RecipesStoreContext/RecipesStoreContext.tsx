import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useEffect } from 'react';
import { ErrorResponse } from 'services/axios';
import { RecipesStore } from 'store';
import { FilterRecipes } from 'store/models/recipes/modelsApi';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { Meta, useLocalStore } from 'utils';

type RecipesStoreContextTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorInfo: ErrorResponse | null;
  recipes: RecipeModel[];
  page: number;
  limit: number;
  total: number;
  getRecipes: () => void;
  setFilter: (key: keyof FilterRecipes, type: string) => void;
  updatePage: (page: number) => void;
};

const RecipesStoreContext = createContext<RecipesStoreContextTypes | null>(null);

export const RecipesStoreProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipesStore = useLocalStore(() => new RecipesStore());
  const isInitial = recipesStore.meta === Meta.initial;
  const isLoading = recipesStore.meta === Meta.loading;
  const isSuccess = recipesStore.meta === Meta.success;
  const isError = recipesStore.meta === Meta.error;
  const isEmpty = isSuccess && recipesStore.recipes.length === 0;
  const errorInfo = recipesStore.error;
  const recipes = recipesStore.recipes;
  const page = recipesStore.page;
  const limit = recipesStore.limit;
  const total = recipesStore.total;
  const getRecipes = recipesStore.getRecipes.bind(recipesStore);
  const setFilter = recipesStore.setFilter.bind(recipesStore);
  const updatePage = recipesStore.updatePage.bind(recipesStore);

  useEffect(() => {
    if (isInitial) {
      // recipesStore.getRecipes();
    }
  }, [recipesStore, isInitial]);

  const value = {
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    errorInfo,
    recipes,
    page,
    limit,
    total,
    getRecipes,
    setFilter,
    updatePage,
  };

  return <RecipesStoreContext.Provider value={value}>{children}</RecipesStoreContext.Provider>;
});

export const useRecipesStoreContext = () => {
  const context = useContext(RecipesStoreContext);

  if (!context) {
    throw new Error('useRecipesContext has to be used within <RecipesStoreContext.Provider>');
  }

  return context;
};
