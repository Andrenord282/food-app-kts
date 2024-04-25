import cn from 'classnames';
import { FC, memo } from 'react';
import { Text } from 'components';
import { useRecipesStoreContext } from 'context';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const { isLoading, isSuccess, isEmpty, isError, limit, recipes, errorInfo } = useRecipesStoreContext();

  if (isLoading) {
    return (
      <div className={cn(className, style.section)}>
        {Array.from({ length: limit })
          .fill(10)
          .map((_, index) => {
            return <SkeletonCard key={index} className={style.item} />;
          })}
      </div>
    );
  }

  if (isSuccess && !isEmpty) {
    return (
      <div className={cn(className, style.section)}>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} className={style.item} />;
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
          {errorInfo?.code}: <br /> {errorInfo?.message}
        </Text>
      </div>
    );
  }
};

export default memo(RecipeList);
