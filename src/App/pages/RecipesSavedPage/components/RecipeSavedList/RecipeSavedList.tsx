import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Text, RecipeSkeletonCard, InfiniteScroll } from 'components';
import { useRecipeSavedListContext } from 'context/RecipeSavedListContext';
import { rootStore } from 'store';
import RecipeCard from '../RecipeCard';
import style from './RecipeSavedList.module.scss';

type RecipeSavedListPorps = {
  className?: string;
};

const RecipeSavedList: FC<RecipeSavedListPorps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isInitial, isLoading, isSuccess, list, limit, total, page, getList } = useRecipeSavedListContext();
  const recipeIdSavedList = rootStore.user.recipeIdSavedList;
  const [recipeViewedList, setRecipeViewedList] = useState<number[]>([]);

  const isEmpty = useMemo(() => {
    return recipeIdSavedList.size === 0 || list.length === 0;
  }, [recipeIdSavedList.size, list.length]);

  useEffect(() => {
    if (isInitial) {
      getList();
    }
  }, [isInitial, getList]);

  const handleUpdateList = useCallback(() => {
    searchParams.set('page', String(page + 1));
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams]);

  const handlerAddViewedRecipe = (id: number) => {
    setRecipeViewedList((oldList) => [...oldList, id]);
  };

  if (isLoading) {
    return (
      <div className={cn(className, style.list)}>
        {list.length > 0 &&
          list.map((item) => {
            if (recipeIdSavedList.has(item.id)) {
              return (
                <RecipeCard
                  key={item.id}
                  recipeViewedList={recipeViewedList}
                  handlerAddViewedRecipe={handlerAddViewedRecipe}
                  saved={recipeIdSavedList.has(item.id)}
                  recipe={item}
                  className={style.item}
                />
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
        <TransitionGroup className={cn(className, style.list)}>
          {list.length > 0 &&
            list.map((item) => {
              if (recipeIdSavedList.has(item.id)) {
                return (
                  <CSSTransition
                    timeout={300}
                    key={item.id}
                    classNames={{
                      exitActive: style['exit--active'],
                    }}
                  >
                    <RecipeCard
                      recipeViewedList={recipeViewedList}
                      handlerAddViewedRecipe={handlerAddViewedRecipe}
                      saved={recipeIdSavedList.has(item.id)}
                      recipe={item}
                      className={style.item}
                    />
                  </CSSTransition>
                );
              }
              return null;
            })}
        </TransitionGroup>
        <InfiniteScroll
          onVisible={handleUpdateList}
          isActive={list.length < recipeIdSavedList.size && list.length !== total}
        />
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

export default observer(RecipeSavedList);
