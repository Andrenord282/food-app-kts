import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ShoppingItemSkeleton, Text } from 'components';
import { useRecipeShoppingListContext } from 'context';
import { rootStore } from 'store/index';
import { RecipeIngredientListClient } from 'store/models/recipe';
import ShoppingItem from '../ShoppingItem';
import style from './RecipeShoppingList.module.scss';

type RecipeShoppingListProps = {
  className?: string;
};

const RecipeShoppingList: FC<RecipeShoppingListProps> = () => {
  const { isInitial, isLoading, isSuccess, list: listFromStore, getList } = useRecipeShoppingListContext();
  const recipeIdShoppingList = rootStore.user.recipeIdShoppingList;
  const [list, setList] = useState<RecipeIngredientListClient[]>([]);

  const isEmpty = useMemo(() => {
    return recipeIdShoppingList.size === 0;
  }, [recipeIdShoppingList.size]);

  const handleUpdateList = useCallback(
    (newItem: RecipeIngredientListClient) => {
      const newList = list.map((prevItem) => {
        if (prevItem.id === newItem.id) return newItem;
        return prevItem;
      });
      setList(newList);
    },
    [list],
  );

  useEffect(() => {
    setList(listFromStore);
  }, [listFromStore]);

  useEffect(() => {
    if (isInitial) {
      getList();
    }
  }, [isInitial, getList]);

  if (isLoading) {
    return (
      <div className={style.list}>
        {Array.from({ length: 10 })
          .fill(10)
          .map((_, index) => {
            return <ShoppingItemSkeleton key={index} className={style.item} />;
          })}
      </div>
    );
  }

  if (isSuccess && !isEmpty) {
    return (
      <TransitionGroup className={style.list}>
        {list.map((recipe) => {
          if (recipeIdShoppingList.has(recipe.id)) {
            return (
              <CSSTransition
                key={recipe.id}
                timeout={300}
                classNames={{
                  exitActive: style['exit--active'],
                }}
              >
                <ShoppingItem handleUpdateList={handleUpdateList} className={style.item} recipe={recipe} />
              </CSSTransition>
            );
          }
          return null;
        })}
      </TransitionGroup>
    );
  }

  if (isSuccess && isEmpty) {
    return (
      <div className={style.information}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          No recipes to shopping
        </Text>
      </div>
    );
  }
};

export default observer(RecipeShoppingList);
