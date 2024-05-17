import { FC } from 'react';
import ShoppingList from './components/ShoppingList';
import style from './RecipesSavedPage.module.scss';

const RecipeShoppingPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <ShoppingList className={style.list} />
      </div>
    </div>
  );
};

export default RecipeShoppingPage;
