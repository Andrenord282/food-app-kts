import cn from 'classnames';
import { FC, memo } from 'react';
import RecipeFilterType from '../RecipeFilterType';
import RecipeInitFilter from '../RecipeInitFilter';
import RecipeOrder from '../RecipeOrder';
import RecipeSearch from '../RecipeSearch';
import style from './RecipeNavigate.module.scss';

type RecipeNavigateProps = {
  className?: string;
};

const RecipeNavigate: FC<RecipeNavigateProps> = ({ className }) => {
  return (
    <div className={cn(className, style.block)}>
      <div className={style.item}>
        <RecipeSearch className={style.search} />
      </div>
      <div className={style.item}>
        <RecipeOrder className={style.filter} />
        <RecipeFilterType className={style.filter} />
        <RecipeInitFilter className={style.buttom} />
      </div>
    </div>
  );
};

export default memo(RecipeNavigate);
