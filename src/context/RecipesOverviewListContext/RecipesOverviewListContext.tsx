import { observer } from 'mobx-react-lite';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { RecipesOverviewListStore } from 'store';
import { useLocalStore } from 'utils';

const RecipesOverviewListContext = createContext<RecipesOverviewListStore | null>(null);

export const RecipesOverviewListProvider: FC<{ children: ReactNode }> = observer(({ children }) => {
  const recipesOverviewList = useLocalStore(() => new RecipesOverviewListStore());

  const value = useMemo(() => {
    return recipesOverviewList;
  }, [recipesOverviewList]);

  return <RecipesOverviewListContext.Provider value={value}>{children}</RecipesOverviewListContext.Provider>;
});

export const useRecipesOverviewList = () => {
  const context = useContext(RecipesOverviewListContext);

  if (!context) {
    throw new Error('useRecipesOverviewList has to be used within <RecipesOverviewListContext.Provider>');
  }

  return context;
};
