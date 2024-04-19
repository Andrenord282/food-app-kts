import { FC } from 'react';
import { RecipesProvider } from 'context/RecipesContext';
import Hero from './components/Hero';
import RecipeFilterList from './components/RecipeFilterList';
import RecipeList from './components/RecipeList';
import RecipePagination from './components/RecipePagination';
import RecipeSearch from './components/RecipeSearch';

const RecipesPage: FC = () => {
  return (
    <RecipesProvider>
      <Hero />
      <RecipeSearch />
      <RecipeFilterList />
      <RecipeList />
      <RecipePagination />
    </RecipesProvider>
  );
};

export default RecipesPage;
