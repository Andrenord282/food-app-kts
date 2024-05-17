
import { FC } from 'react';
import ShoppingList from './components/ShoppingList';
import style from './RecipesSavedPage.module.scss';

const RecipeShoppingPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <ShoppingList className={style.list} />
    </div>
  );
};

export default RecipeShoppingPage;
