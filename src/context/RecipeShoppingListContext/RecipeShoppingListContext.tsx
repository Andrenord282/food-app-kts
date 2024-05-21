import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { RecipeShoppingListStore } from 'store';
import { useLocalStore } from 'utils';

const RecipeShoppingListContext = createContext<RecipeShoppingListStore | null>(null);

export const RecipeShoppingListProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipeShoppingListStore = useLocalStore(() => new RecipeShoppingListStore());

  const value = useMemo(() => {
    return recipeShoppingListStore;
  }, [recipeShoppingListStore]);

  return <RecipeShoppingListContext.Provider value={value}>{children}</RecipeShoppingListContext.Provider>;
});

export const useRecipeShoppingListContext = () => {
  const context = useContext(RecipeShoppingListContext);

  if (!context) {
    throw new Error('useRecipeShoppingListContext has to be used within <RecipeShoppingListContext.Provider>');
  }

  return context;
};
