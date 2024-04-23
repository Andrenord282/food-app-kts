import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useEffect } from 'react';
import { ErrorResponse } from 'services/axios/types';
import RecipesStore from 'store/RecipesStore';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';

type RecipesStoreContextTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorInfo: ErrorResponse | null;
  numberRecipes: number;
  resipes: RecipeModel[];
  recipesStore: RecipesStore;
  getRecipes: () => Promise<void>;
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
  const numberRecipes = recipesStore.numberRecipes;
  const resipes = recipesStore.resipes;
  const getRecipes = recipesStore.getRecipes.bind(recipesStore);

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
    numberRecipes,
    resipes,
    recipesStore,
    getRecipes,
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
