import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IconButton, Icon, SearchIcon } from 'components';
import { useRecipeSavedListContext } from 'context';

type RecipeInitFilterProps = {
  className?: string;
};

const RecipeInitFilter: FC<RecipeInitFilterProps> = ({ className }) => {
  const { isLoading, getList } = useRecipeSavedListContext();

  const handleInitFilter = () => {
    getList({ resetPage: true });
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

export default observer(RecipeInitFilter);
