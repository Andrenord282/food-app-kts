import { FC } from 'react';
import useFetchRecipeList from '../../hooks/useFetchRecipeList';
import { useRecipesContext } from 'context/RecipesContext';
import BaseButton from 'components/BaseButton';
import Text from 'components/Text';
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
              const { id, image, readyInMinutes, title, nutrition } = recipe;
              const cookingTime = `${readyInMinutes} minutes`;
              const composition = nutrition.ingredients.map(({ name }) => name).join(' + ');
              const nutritional = `${nutrition.nutrients[0].amount.toFixed()} ${nutrition.nutrients[0].unit}`;
              return (
                <RecipeCard
                  key={id}
                  image={image}
                  cookingTime={cookingTime}
                  title={title}
                  composition={composition}
                  nutritional={nutritional}
                  button={
                    <BaseButton>
                      <Text>Save</Text>
                    </BaseButton>
                  }
                />
              );
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
