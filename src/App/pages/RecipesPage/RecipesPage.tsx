import { FC } from 'react';
import { Recipes } from './components/Recipes';
import style from './RecipesPage.module.scss';

const RecipesPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.hero}>HERO</div>
      <Recipes />
    </div>
  );
};

export { RecipesPage };
