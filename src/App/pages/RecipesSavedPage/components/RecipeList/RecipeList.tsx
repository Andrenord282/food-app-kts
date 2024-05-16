import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Text, RecipeSkeletonCard, InfiniteScroll } from 'components';
import { useRecipeSavedListContext } from 'context/RecipeSavedListContext';
import { rootStore } from 'store';
import RecipeCard from '../RecipeCard';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isInitial, isLoading, isSuccess, isEmpty, list, limit, page, total, getList } = useRecipeSavedListContext();
  const recipeIdSavedList = rootStore.user.recipeIdSavedList;

  useEffect(() => {
    if (isInitial) {
      getList();
    }
  }, [isInitial, getList]);

  const handleUpdateList = useCallback(() => {
    searchParams.set('page-saved', String(page + 1));
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams]);

  if (isLoading) {
    return (
      <div className={cn(className, style.list)}>
        {list.length > 0 &&
          list.map((item) => {
            if (recipeIdSavedList.has(item.id)) {
              return (
                <RecipeCard key={item.id} saved={recipeIdSavedList.has(item.id)} recipe={item} className={style.item} />
              );
            }
            return null;
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
        <div className={cn(className, style.list)}>
          {list.length > 0 &&
            list.map((item) => {
              if (recipeIdSavedList.has(item.id)) {
                return (
                  <RecipeCard
                    key={item.id}
                    saved={recipeIdSavedList.has(item.id)}
                    recipe={item}
                    className={style.item}
                  />
                );
              }
              return null;
            })}
        </div>
        <InfiniteScroll onVisible={handleUpdateList} isActive={list.length !== total} />
      </>
    );
  }

  if (isSuccess && isEmpty) {
    return (
      <div className={cn(className, style.information)}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          No saved recipes
        </Text>
      </div>
    );
  }
};

export default observer(RecipeList);
