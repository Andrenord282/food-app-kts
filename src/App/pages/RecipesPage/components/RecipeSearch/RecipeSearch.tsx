import cn from 'classnames';
import { FC, useState, useEffect, useCallback, memo, useMemo } from 'react';
import BaseInput from 'components/BaseInput';
import IconButton from 'components/IconButton';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import { useRecipesContext } from 'context';
import useDebounce from 'hooks/useDebounce';
import style from './RecipeSearch.module.scss';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const { recipeListState, handleUpdateFilter, handleRecipeListState } = useRecipesContext();
  const [searchName, setSearchName] = useState('');
  const debouncedSearchName = useDebounce(searchName);
  const searchLoading = useMemo(() => {
    if (recipeListState === 'init' || recipeListState === 'loading') {
      return true;
    } else {
      return false;
    }
  }, [recipeListState]);

  const handleSearchName = useCallback((value: string) => {
    setSearchName(value);
  }, []);

  const onClickSearchButton = useCallback(() => {
    handleRecipeListState('loading');
  }, [handleRecipeListState]);

  useEffect(() => {
    if (debouncedSearchName.length === 0) return;
    handleUpdateFilter({ query: debouncedSearchName });
    handleRecipeListState('loading');
  }, [debouncedSearchName, handleUpdateFilter, handleRecipeListState]);

  return (
    <div className={cn(className, style.section)}>
      <Text className={style.title} view="p-l" align="center">
        Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every occasion,
        from <span style={{ textDecoration: 'underline' }}>weeknight dinners</span> to{' '}
        <span style={{ textDecoration: 'underline' }}>holiday feasts</span>.
      </Text>
      <BaseInput
        value={searchName}
        onChange={handleSearchName}
        placeholder="enter the name of the dish"
        className={style.search}
      />
      <IconButton
        onClick={onClickSearchButton}
        disabled={searchLoading}
        loading={searchLoading}
        className={style.button}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default memo(RecipeSearch);
