import cn from 'classnames';
import { FC } from 'react';
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
      <RecipeSearch className={style.item} />
      <RecipeOrder className={style.item} />
      <RecipeFilterType className={style.item} />
      <RecipeInitFilter className={style.item} />
    </div>
  );
};

export default RecipeNavigate;
