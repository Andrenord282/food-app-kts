import { FC } from 'react';
import RecipeShoppingList from './components/RecipeShoppingList';
import style from './RecipesSavedPage.module.scss';

const RecipeShoppingPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <RecipeShoppingList className={style.list} />
      </div>
    </div>
  );
};

export default RecipeShoppingPage;
