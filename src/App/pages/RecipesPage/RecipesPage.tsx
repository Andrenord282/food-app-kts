import { FC } from 'react';
import Hero from './components/Hero';
import RecipeFilters from './components/RecipeFilters';
import RecipeList from './components/RecipeList';
import RecipePagination from './components/RecipePagination';
import RecipeSearch from './components/RecipeSearch';
import * as style from './RecipesPage.module.scss';

const RecipesPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <Hero className={style.hero} />
      <RecipeSearch className={style.search} />
      <RecipeFilters className={style.filters} />
      <RecipeList className={style.list} />
      <RecipePagination className={style.pagination} />
    </div>
  );
};

export default RecipesPage;
