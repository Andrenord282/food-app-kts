import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton, Icon, SearchIcon } from 'components';
import { useRecipesOverviewList } from 'context';

type RecipeInitFilterProps = {
  className?: string;
};

const RecipeInitFilter: FC<RecipeInitFilterProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, getList } = useRecipesOverviewList();

  const handleInitFilter = useCallback(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
    getList({ resetPage: true });
  }, [searchParams, setSearchParams, getList]);

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

export default observer(RecipeInitFilter);
