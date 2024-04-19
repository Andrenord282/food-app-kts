import { FC } from 'react';
import { useRecipesContext } from 'context/RecipesContext';
import useFetchRecipeList from '../../hooks/useFetchRecipeList';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import style from './RecipeList.module.scss';

const RecipeList: FC = () => {
  const { recipeListState, recipeList, cursorList } = useRecipesContext();
  useFetchRecipeList();

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.list}>
          {recipeListState === 'loaded' &&
            recipeList.map((recipe) => {
              return <RecipeCard recipe={recipe} key={recipe.id} />;
            })}
          {recipeListState === 'loading' && (
            <div className={style.list}>
              {Array.from({ length: cursorList.number })
                .fill(10)
                .map((_, index) => {
                  return <SkeletonCard key={index} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
