import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { Text, RecipeCard, RecipeSkeletonCard, InfiniteScroll } from 'components';
import { useRecipeSavedListContext } from 'context/RecipeSavedListContext';
import { rootStore } from 'store';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const { isInitial, isLoading, isSuccess, isEmpty, list, limit, total, getList } = useRecipeSavedListContext();
  const recipeIdSavedList = rootStore.user.recipeIdSavedList;

  useEffect(() => {
    if (isInitial) {
      getList();
    }
  }, [isInitial, getList]);

  const handleUpdateList = useCallback(() => {
    getList();
  }, [getList]);

  if (isLoading) {
    return (
      <div className={cn(className, style.section)}>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <RecipeCard key={item.id} saved={recipeIdSavedList.has(item.id)} recipe={item} className={style.item} />
            );
          })}
        {Array.from({ length: limit })
          .fill(10)
          .map((_, index) => {
            return <RecipeSkeletonCard key={index} className={style.item} />;
          })}
      </div>
    );
  }

  if (isSuccess && !isEmpty) {
    return (
      <>
        <div className={cn(className, style.section)}>
          {list.map((item) => {
            return (
              <RecipeCard key={item.id} saved={recipeIdSavedList.has(item.id)} recipe={item} className={style.item} />
            );
          })}
        </div>
        <InfiniteScroll onVisible={handleUpdateList} isActive={list.length !== total} />
      </>
    );
  }

  if (isSuccess && isEmpty) {
    return (
      <div className={cn(className, style.section, style['section--information'])}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          No saved recipes
        </Text>
      </div>
    );
  }
};

export default observer(RecipeList);
