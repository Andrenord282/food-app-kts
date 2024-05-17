import { FC } from 'react';
import { IconButton, SearchIcon } from 'components';
import { useRecipesStoreContext } from 'context';

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
