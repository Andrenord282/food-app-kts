import { FC } from 'react';
import RecipeList from './components/RecipeList';
import style from './RecipesPage.module.scss';

const RecipesPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.hero}>HERO</div>
      <RecipeList />
    </div>
  );
};

export default RecipesPage;
