import { FC } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import BaseButton from 'components/BaseButton';
import Text from 'components/Text';
import { ROUTS } from 'config/routs';
import { useRecipesContext } from 'context/RecipesContext';
import useFetchRecipeList from '../../hooks/useFetchRecipeList';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import style from './RecipeList.module.scss';

const RecipeList: FC = () => {
  const { recipeListState, recipeList, cursorList } = useRecipesContext();
  const navigate = useNavigate();
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
              const handleClickCard = () => {
                navigate(generatePath(ROUTS.RECIPE, { id }));
              };

              return (
                <RecipeCard
                  key={id}
                  image={image}
                  cookingTime={cookingTime}
                  title={title}
                  composition={composition}
                  nutritional={nutritional}
                  handleClickCard={handleClickCard}
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
