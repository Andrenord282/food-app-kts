import { FC } from 'react';
import style from './RecipeHero.module.scss';

const RecipeHero: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.content}></div>
    </div>
  );
};

export default RecipeHero;
