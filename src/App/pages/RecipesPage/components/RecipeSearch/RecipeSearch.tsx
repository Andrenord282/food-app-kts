import cn from 'classnames';
import { FC, useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import BaseInput from 'components/BaseInput';
import IconButton from 'components/IconButton';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import { useRecipesStoreContext } from 'context/RecipesStoreContext';
import useDebounce from 'hooks/useDebounce';
import rootStore from 'store/RootStore';
import style from './RecipeSearch.module.scss';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading } = useRecipesStoreContext();
  const [searchName, setSearchName] = useState('');
  const debouncedSearchName = useDebounce(searchName);

  const handleChangeSearchName = useCallback((value: string) => {
    setSearchName(value);
  }, []);

  const onClickSearch = useCallback(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (debouncedSearchName.length === 0) {
      searchParams.delete('query');
      searchParams.delete('page');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('query', debouncedSearchName);
    setSearchParams(searchParams);
  }, [debouncedSearchName, searchParams, setSearchParams]);

  return (
    <div className={cn(className, style.section)}>
      <Text className={style.title} view="p-l" align="center">
        Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every occasion,
        from <span style={{ textDecoration: 'underline' }}>weeknight dinners</span> to{' '}
        <span style={{ textDecoration: 'underline' }}>holiday feasts</span>.
      </Text>
      <BaseInput
        value={searchName}
        onChange={handleChangeSearchName}
        placeholder="enter the name of the dish"
        className={style.search}
      />
      <IconButton onClick={onClickSearch} disabled={isLoading} loading={isLoading} className={style.button}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default memo(RecipeSearch);
