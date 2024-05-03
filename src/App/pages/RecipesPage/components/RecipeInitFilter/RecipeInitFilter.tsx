import { FC } from 'react';
import IconButton from 'components/IconButton';
import { SearchIcon } from 'components/icons';
import { useRecipesStoreContext } from 'context/RecipesStoreContext';

type RecipeInitFilterProps = {
  className?: string;
};

const RecipeInitFilter: FC<RecipeInitFilterProps> = ({ className }) => {
  const { isLoading, getRecipes } = useRecipesStoreContext();

  const handleInitFilter = () => {
    getRecipes({ resetPage: true });
  };

  return (
    <IconButton disabled={isLoading} loading={isLoading} onClick={handleInitFilter} className={className}>
      <SearchIcon />
    </IconButton>
  );
};

export default RecipeInitFilter;
