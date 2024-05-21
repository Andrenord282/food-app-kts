import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { RecipeSavedListStore } from 'store';
import { useLocalStore } from 'utils';

const RecipeSavedListContext = createContext<RecipeSavedListStore | null>(null);

export const RecipeSavedListProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipeSavedListStore = useLocalStore(() => new RecipeSavedListStore());

  const value = useMemo(() => {
    return recipeSavedListStore;
  }, [recipeSavedListStore]);

  return <RecipeSavedListContext.Provider value={value}>{children}</RecipeSavedListContext.Provider>;
});

export const useRecipeSavedListContext = () => {
  const context = useContext(RecipeSavedListContext);

  if (!context) {
    throw new Error('useRecipeSavedListContext has to be used within <RecipeSavedListContext.Provider>');
  }

  return context;
};
