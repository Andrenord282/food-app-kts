import { FC } from 'react';
import { IconButton, Icon, SearchIcon } from 'components';
import { useRecipesOverviewList } from 'context';

type RecipeInitFilterProps = {
  className?: string;
};

const RecipeInitFilter: FC<RecipeInitFilterProps> = ({ className }) => {
  const { isLoading, getRecipes } = useRecipesOverviewList();

  const handleInitFilter = () => {
    getRecipes({ resetPage: true });
  };

  return (
    <IconButton
      variant="accent"
      disabled={isLoading}
      loading={isLoading}
      onClick={handleInitFilter}
      className={className}
    >
      <Icon>
        <SearchIcon color="secondary" />
      </Icon>
    </IconButton>
  );
};

export default RecipeInitFilter;
