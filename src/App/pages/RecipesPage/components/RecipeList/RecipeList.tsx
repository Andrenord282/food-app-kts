import cn from 'classnames';
import { FC, memo } from 'react';
import Text from 'components/Text';
import { useRecipesContext, RecipeListState } from 'context/RecipesContext';
import useFetchRecipeList from '../../hooks/useFetchRecipeList';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import style from './RecipeList.module.scss';

type RecipeListPorps = {
  className?: string;
};

type RecipeListMapType = {
  [key in RecipeListState]: () => JSX.Element[] | JSX.Element;
};

const RecipeList: FC<RecipeListPorps> = ({ className }) => {
  const { recipeListState, recipeList, cursorList, errorInfo } = useRecipesContext();
  useFetchRecipeList();

  const RecipeListMap: RecipeListMapType = {
    loading: () => {
      return Array.from({ length: cursorList.number })
        .fill(10)
        .map((_, index) => {
          return <SkeletonCard key={index} className={style.item} />;
        });
    },
    init: () => {
      return Array.from({ length: cursorList.number })
        .fill(10)
        .map((_, index) => {
          return <SkeletonCard key={index} className={style.item} />;
        });
    },
    loaded: () => {
      return recipeList.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} className={style.item} />;
      });
    },
    empty: () => {
      return (
        <div>
          <Text tag="h2" view="title-l" weight="700" align="center">
            No recipes found for your search
          </Text>
        </div>
      );
    },
    fail: () => {
      return (
        <div>
          <Text tag="h2" view="title-l" weight="700" align="center">
            {errorInfo?.code}, {errorInfo?.status}
          </Text>
          <Text tag="p" view="p-l" weight="700" align="center">
            {errorInfo?.message}
          </Text>
        </div>
      );
    },
  };

  return (
    <div
      className={cn(className, style.section, {
        [style['section--information']]: errorInfo !== null || recipeListState === 'empty',
      })}
    >
      {RecipeListMap[recipeListState]()}
    </div>
  );
};

export default memo(RecipeList);
