import cn from 'classnames';
import { FC, memo } from 'react';
import RecipeFilterType from '../RecipeFilterType';
import RecipeInitFilter from '../RecipeInitFilter';
import style from './RecipeFilters.module.scss';

type RecipeFiltersProps = {
  className?: string;
};

const RecipeFilters: FC<RecipeFiltersProps> = ({ className }) => {
  return (
    <div className={cn(className, style.section)}>
      <RecipeFilterType className={style.filter} />
      <RecipeInitFilter className={style.init} />
    </div>
  );
};

export default memo(RecipeFilters);
