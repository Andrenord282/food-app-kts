import { FC } from 'react';
import { RecipesProvider } from 'context/RecipesContext';
import RecipeHero from './components/RecipeHero';
import RecipeSearch from './components/RecipeSearch';
import RecipeFilterList from './components/RecipeFilterList';
import RecipeList from './components/RecipeList';
import RecipePagination from './components/RecipePagination';

const RecipesPage: FC = () => {
  return (
    <RecipesProvider>
      <RecipeHero />
      <RecipeSearch />
      <RecipeFilterList />
      <RecipeList />
      <RecipePagination />
    </RecipesProvider>
  );
};

export default RecipesPage;
