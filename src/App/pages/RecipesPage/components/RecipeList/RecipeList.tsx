import cn from 'classnames';
import { FC, memo } from 'react';
import Text from 'components/Text';
import { useRecipesContext } from 'context/RecipesContext';
import useFetchRecipeList from '../../hooks/useFetchRecipeList';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const { recipeListState, recipeList, cursorList, errorInfo } = useRecipesContext();
  useFetchRecipeList();

  if (recipeListState === 'init' || recipeListState === 'loading') {
    return (
      <div className={cn(className, style.section)}>
        {Array.from({ length: cursorList.number })
          .fill(10)
          .map((_, index) => {
            return <SkeletonCard key={index} className={style.item} />;
          })}
      </div>
    );
  }

  if (recipeListState === 'loaded') {
    return (
      <div className={cn(className, style.section)}>
        {recipeList.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} className={style.item} />;
        })}
      </div>
    );
  }

  if (recipeListState === 'empty') {
    return (
      <div className={cn(className, style.section, style['section--information'])}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          No recipes found for your search
        </Text>
      </div>
    );
  }

  if (recipeListState === 'fail') {
    return (
      <div className={cn(className, style.section, style['section--information'])}>
        <Text tag="h2" view="title-l" weight="700" align="center">
          {errorInfo?.code}, {errorInfo?.status}: <br /> {errorInfo?.message}
        </Text>
      </div>
    );
  }
};

export default memo(RecipeList);
