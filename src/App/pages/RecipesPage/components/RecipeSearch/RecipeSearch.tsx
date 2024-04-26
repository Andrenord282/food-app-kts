import cn from 'classnames';
import { FC, useState, useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton, BaseInput, Text, SearchIcon } from 'components';
import { useRecipesStoreContext } from 'context';
import style from './RecipeSearch.module.scss';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, filter, setFilter, getRecipes } = useRecipesStoreContext();
  const [value, setValue] = useState(filter.query);

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value);
      setFilter('query', value);
      // сейчас я вынес в стор работу с значением query и убрал отсюда таймер
      // setSearchParams отрабатывает каждый раз и создает ререндер
      // я хочу работу с url search всю вынести в QueryParamsStore, подумаю как сделать это
      value ? searchParams.set('query', value) : searchParams.delete('query');
      searchParams.delete('page');
      setSearchParams(searchParams);
    },
    [setFilter, searchParams, setSearchParams],
  );

  const onClickSearch = useCallback(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
    getRecipes({ resetPage: true });
  }, [getRecipes, searchParams, setSearchParams]);

  return (
    <div className={cn(className, style.section)}>
      <Text className={style.title} view="p-l" align="center">
        Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every occasion,
        from <span style={{ textDecoration: 'underline' }}>weeknight dinners</span> to{' '}
        <span style={{ textDecoration: 'underline' }}>holiday feasts</span>.
      </Text>
      <BaseInput
        value={value}
        onChange={handleChangeValue}
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
