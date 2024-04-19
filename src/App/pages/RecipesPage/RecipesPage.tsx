import { FC } from 'react';
import { RecipesProvider } from 'context/RecipesContext';
import Hero from './components/Hero';
import RecipeFilters from './components/RecipeFilters';
import RecipeList from './components/RecipeList';
import RecipePagination from './components/RecipePagination';
import RecipeSearch from './components/RecipeSearch';
import style from './RecipesPage.module.scss';

const RecipesPage: FC = () => {
  return (
    <RecipesProvider>
      <div className={style.wrapper}>
        <Hero className={style.hero} />
        <RecipeSearch className={style.search} />
        <RecipeFilters className={style.filters} />
        <RecipeList />
        <RecipePagination />
      </div>
    </RecipesProvider>
  );
};

export default RecipesPage;
