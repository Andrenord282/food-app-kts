import cn from 'classnames';
import { FC } from 'react';
import RecipeFilterType from '../RecipeFilterType';
import style from './RecipeFilters.module.scss';

type RecipeFiltersProps = {
  className?: string;
};

const RecipeFilters: FC<RecipeFiltersProps> = ({ className }) => {
  return (
    <div className={cn(className, style.section)}>
      <RecipeFilterType className={style.filter} />
    </div>
  );
};

export default RecipeFilters;
