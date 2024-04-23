import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useCallback, useContext, useEffect } from 'react';
import { ErrorResponse } from 'services/axios/types';
import RecipesStore from 'store/RecipesStore';
import { FilterRecipes } from 'store/models/recipes/modelsApi';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';

type RecipesStoreContextTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorInfo: ErrorResponse | null;
  resipes: RecipeModel[];
  page: number;
  limit: number;
  getRecipes: () => void;
  setFilter: (key: keyof FilterRecipes, type: string) => void;
};

const RecipesStoreContext = createContext<RecipesStoreContextTypes | null>(null);

export const RecipesStoreProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipesStore = useLocalStore(() => new RecipesStore());
  const isInitial = recipesStore.meta === Meta.initial;
  const isLoading = recipesStore.meta === Meta.loading;
  const isSuccess = recipesStore.meta === Meta.success;
  const isError = recipesStore.meta === Meta.error;
  const isEmpty = isSuccess && recipesStore.resipes.length === 0;
  const errorInfo = recipesStore.error;
  const resipes = recipesStore.resipes;
  const page = recipesStore.page;
  const limit = recipesStore.limit;
  const getRecipes = useCallback(() => recipesStore.getRecipes.bind(recipesStore), [recipesStore]);
  const setFilter = useCallback(() => recipesStore.setFilter.bind(recipesStore), [recipesStore]);

  useEffect(() => {
    if (isInitial) {
      recipesStore.getRecipes();
    }
  }, [recipesStore, isInitial]);

  const value = {
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    errorInfo,
    resipes,
    page,
    limit,
    getRecipes,
    setFilter,
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
