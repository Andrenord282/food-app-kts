import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import Text from 'components/Text';
import RecipesStore from 'store/recipesStore';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const recipesStore = useLocalStore(() => new RecipesStore());
  const isLoading = recipesStore.meta === Meta.loading;
  const isSuccess = recipesStore.meta === Meta.success;
  const isError = recipesStore.meta === Meta.error;
  const isEmpty = isSuccess && recipesStore.resipes.length === 0;
  const errorInfo = recipesStore.error;

  useEffect(() => {
    recipesStore.getRecipes();
  }, [recipesStore]);

  if (isLoading) {
    return (
      <div className={cn(className, style.section)}>
        {Array.from({ length: recipesStore.numberRecipes })
          .fill(10)
          .map((_, index) => {
            return <SkeletonCard key={index} className={style.item} />;
          })}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={cn(className, style.section)}>
        {recipesStore.resipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} className={style.item} />;
        })}
      </div>
    );
  }

  if (isEmpty) {
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
          {errorInfo?.code}, {errorInfo?.status}: <br /> {errorInfo?.message}
        </Text>
      </div>
    );
  }
};

export default observer(RecipeList);
