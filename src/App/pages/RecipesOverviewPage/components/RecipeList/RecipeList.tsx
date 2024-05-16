import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Text, RecipeSkeletonCard } from 'components';
import { useRecipesOverviewList } from 'context';
import { rootStore } from 'store';
import RecipeCard from '../RecipeCard';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const { isInitial, isLoading, isSuccess, isError, isEmpty, limit, list, error, getList } = useRecipesOverviewList();
  const recipeIdSavedList = rootStore.user.recipeIdSavedList;
  const userInitial = rootStore.user.userInitial;

  useEffect(() => {
    if (isInitial) {
      getList();
    }
  }, [isInitial, getList]);

  if (isLoading || userInitial) {
    return (
      <div className={cn(className, style.section)}>
        {Array.from({ length: limit })
          .fill(10)
          .map((_, index) => {
            return <RecipeSkeletonCard key={index} className={style.item} />;
          })}
      </div>
    );
  }

  if (isSuccess && !isEmpty && !userInitial) {
    return (
      <div className={cn(className, style.section)}>
        {list.map((item) => {
          return (
            <RecipeCard key={item.id} saved={recipeIdSavedList.has(item.id)} recipe={item} className={style.item} />
          );
        })}
      </div>
    );
  }

  if (isSuccess && isEmpty) {
    return (
      <div className={cn(className, style.section, style['section--information'])}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          No recipes found for your search
        </Text>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn(className, style.section, style['section--information'])}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          {error?.code}: <br /> {error?.message}
        </Text>
      </div>
    );
  }
};

export default observer(RecipeList);
