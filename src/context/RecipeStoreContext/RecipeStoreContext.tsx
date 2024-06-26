import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { ErrorResponse } from 'services/axios';
import { RecipeDetailsStore } from 'store';
import { RecipeDetailsClient } from 'store/models/recipe';
import { useLocalStore } from 'utils';

type RecipeStoreContextTypes = {
  isInitial: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  recipe: RecipeDetailsClient | null;
  error: ErrorResponse | null;
  getRecipe: (id: string) => Promise<void>;
};

const RecipeStoreContext = createContext<RecipeStoreContextTypes | null>(null);

export const RecipeStoreProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipeStore = useLocalStore(() => new RecipeDetailsStore());
  const { isInitial, isLoading, isError, isSuccess, recipe, error, getRecipe } = recipeStore;

  const value = useMemo(
    () => ({ isInitial, isLoading, isError, isSuccess, recipe, error, getRecipe }),
    [isInitial, isLoading, isError, isSuccess, recipe, error, getRecipe],
  );

  return <RecipeStoreContext.Provider value={value}>{children}</RecipeStoreContext.Provider>;
});

export const useRecipeStoreContext = () => {
  const context = useContext(RecipeStoreContext);

  if (!context) {
    throw new Error('useRecipesContext has to be used within <RecipesStoreContext.Provider>');
  }

  return context;
};
