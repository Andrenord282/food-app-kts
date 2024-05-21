import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { useRecipesOverviewList } from 'context';
import Hero from './components/Hero';
import RecipeNavigate from './components/RecipeNavigate';
import RecipeOverviewList from './components/RecipeOverviewList';
import RecipePagination from './components/RecipePagination';
import style from './RecipesOverviewPage.module.scss';

const RecipesOverviewPage: FC = () => {
  const { isEmpty, isError } = useRecipesOverviewList();
  const [heightNavigate, setHeightNavigate] = useState<number>(0);
  const recipeNavigateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recipeNavigateRef.current) {
      const { top } = recipeNavigateRef.current.getBoundingClientRect();
      setHeightNavigate(top);
    }
  }, [recipeNavigateRef]);

  return (
    <div className={style.wrapper}>
      <Hero className={style.hero} />
      <RecipeNavigate ref={recipeNavigateRef} className={style.navigate} />
      <RecipeOverviewList className={style.list} />
      {!isError && !isEmpty && <RecipePagination scrollHeight={heightNavigate} className={style.pagination} />}
    </div>
  );
};

export default observer(RecipesOverviewPage);
