import { FC } from 'react';
import RecipeList from './components/RecipeList';
import RecipeNavigate from './components/RecipeNavigate';
import style from './RecipesSavedPage.module.scss';

const RecipesSavedPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <RecipeNavigate className={style.navigate} />
      <RecipeList className={style.list} />
    </div>
  );
};

export default RecipesSavedPage;
