import { FC } from 'react';
import RecipeFilterType from '../RecipeFilterType';
import style from './RecipeFilter.module.scss';

const RecipeFilterList: FC = () => {
  return (
    <div className={style['filter-list']}>
      <div className={style.container}>
        <div className={style.content}>
          <RecipeFilterType />
        </div>
      </div>
    </div>
  );
};

export default RecipeFilterList;
