import cn from 'classnames';
import { FC, useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton, BaseInput, Text, SearchIcon } from 'components';
import { useRecipesStoreContext } from 'context';
import { IntervalStore, rootStore } from 'store';
import { useLocalStore } from 'utils/useLocalStore';
import style from './RecipeSearch.module.scss';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const intervalStore = useLocalStore(() => new IntervalStore());
  const { isLoading, getRecipes } = useRecipesStoreContext();
  const [value, setValue] = useState('');
  const [btn, setBtn] = useState(0);

  useEffect(() => {
    const query = rootStore.query.getParam('query');

    if (!query) return;
    setValue(query);
  }, []);

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value);
      intervalStore.startTimeout(() => {
        value ? searchParams.set('query', value) : searchParams.delete('query');
        searchParams.delete('page');
        setSearchParams(searchParams);
      }, 1000);
    },
    [intervalStore, searchParams, setSearchParams],
  );

  const onClickSearch = useCallback(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);
    getRecipes();
  }, [getRecipes, searchParams, setSearchParams]);

  return (
    <div className={cn(className, style.section)}>
      <button
        style={{ border: '1px solid #000', padding: '20px' }}
        onClick={() => {
          setBtn((btn) => btn + 1);
        }}
      >
        {btn}
      </button>
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
