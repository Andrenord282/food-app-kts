import { FC } from 'react';
import RecipeList from './components/RecipeList';
import style from './RecipesSavedPage.module.scss';

const RecipesSavedPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <RecipeList className={style.list} />
    </div>
  );
};

export default RecipesSavedPage;
