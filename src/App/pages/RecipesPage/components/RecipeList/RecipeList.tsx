import { FC, useEffect } from 'react';
import Text from 'components/Text';
import BaseButton from 'components/BaseButton';
import RecipeCard from '../RecipeCard';
import SkeletonCard from '../SkeletonCard';
import useFetchRecipeList from './hooks/useFetchRecipeList';

import style_gl from 'styles/global.module.scss';
import style from './RecipeList.module.scss';

const RecipeList: FC = () => {
  const { fetchState, recipeList, fetchRecipeList } = useFetchRecipeList();

  useEffect(() => {
    if (fetchState === 'loading') {
      // fetchRecipeList();
    }
  }, [fetchState]);

  return (
    <div className={style.wrapper}>
      <div className={style_gl['container--m']}>
        <Text view="p-l" align="center" className={style['description-text']}>
          Find the perfect food and{' '}
          <Text tag="span" decoration="underline">
            drink ideas
          </Text>{' '}
          for every occasion, from{' '}
          <Text tag="span" decoration="underline">
            weeknight dinners
          </Text>{' '}
          to{' '}
          <Text tag="span" decoration="underline">
            holiday feasts
          </Text>
          .
        </Text>
        {fetchState === 'loaded' && (
          <div className={style['recipe-list']}>
            {recipeList.map((recipe) => {
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
                  button={<BaseButton text="Save" />}
                />
              );
            })}
          </div>
        )}
        {fetchState === 'loading' && (
          <div className={style['recipe-list']}>
            {Array.from({ length: 10 })
              .fill(10)
              .map((_, index) => {
                return <SkeletonCard key={index} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
