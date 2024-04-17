import { FC } from 'react';
import RecipeList from './components/RecipeList';
import RecipeHero from './components/RecipeHero';
import style from './RecipesPage.module.scss';

const RecipesPage: FC = () => {
  return (
    <>
      <RecipeHero />
      <RecipeList />
    </>
  );
};

export default RecipesPage;
