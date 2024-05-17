import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRecipeShoppingListContext } from 'context';
import { rootStore } from 'store/index';
import { RecipeIngredientListClient } from 'store/models/recipe';
import ShoppingItem from '../ShoppingItem';
import style from './ShoppingList.module.scss';

type ShoppingListProps = {
  className?: string;
};

const ShoppingList: FC<ShoppingListProps> = () => {
  const { isInitial, isLoading, isSuccess, isEmpty, list: listFromStore, getList } = useRecipeShoppingListContext();
  const recipeIdShoppingList = rootStore.user.recipeIdShoppingList;
  const [list, setList] = useState<RecipeIngredientListClient[]>([]);

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
    return <div>isLoading</div>;
  }

  if (isSuccess && !isEmpty) {
    return (
      <div>
        {list.length > 0 &&
          list.map((recipe) => {
            if (recipeIdShoppingList.has(recipe.id)) {
              return (
                <ShoppingItem
                  handleUpdateList={handleUpdateList}
                  className={style.item}
                  key={recipe.id}
                  recipe={recipe}
                />
              );
            }
            return null;
          })}
      </div>
    );
  }

  if (isSuccess && isEmpty) {
    return <div>isEmpty</div>;
  }
};

export default observer(ShoppingList);
