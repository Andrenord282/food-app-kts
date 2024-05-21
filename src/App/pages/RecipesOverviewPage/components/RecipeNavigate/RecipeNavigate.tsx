import cn from 'classnames';
import { forwardRef, memo } from 'react';
import { Text } from 'components';
import RecipeFilterCuisine from '../RecipeFilterCuisine';
import RecipeFilterType from '../RecipeFilterType';
import RecipeInitFilter from '../RecipeInitFilter';
import RecipeSearch from '../RecipeSearch';
import style from './RecipeNavigate.module.scss';

type RecipeNavigateProps = {
  className?: string;
};

const RecipeNavigate = forwardRef<HTMLDivElement, RecipeNavigateProps>(({ className }, ref) => {
  return (
    <div ref={ref} className={cn(className, style.block)}>
      <Text className={style.title} view="p-l" align="center">
        Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every occasion,
        from <span style={{ textDecoration: 'underline' }}>weeknight dinners</span> to{' '}
        <span style={{ textDecoration: 'underline' }}>holiday feasts</span>.
      </Text>
      <div className={style.item}>
        <RecipeSearch className={style.search} />
      </div>
      <div className={style.item}>
        <RecipeFilterCuisine className={style.filter} />
        <RecipeFilterType className={style.filter} />
        <RecipeInitFilter className={style.buttom} />
      </div>
    </div>
  );
});

RecipeNavigate.displayName = 'RecipeNavigate';

export default memo(RecipeNavigate);
