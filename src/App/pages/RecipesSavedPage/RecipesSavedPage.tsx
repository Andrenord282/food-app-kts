import { FC } from 'react';
import RecipeNavigate from './components/RecipeNavigate';
import RecipeSavedList from './components/RecipeSavedList';
import style from './RecipesSavedPage.module.scss';

const RecipesSavedPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <RecipeNavigate className={style.navigate} />
      <RecipeSavedList className={style.list} />
    </div>
  );
};

export default RecipesSavedPage;
