import { FC } from 'react';
import { RecipesProvider } from 'context/RecipesContext';
import RecipeFilterList from './components/RecipeFilterList';
import RecipeHero from './components/RecipeHero';
import RecipeList from './components/RecipeList';
import RecipePagination from './components/RecipePagination';
import RecipeSearch from './components/RecipeSearch';

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
