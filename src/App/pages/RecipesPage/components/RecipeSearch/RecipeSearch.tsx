import { FC, useState, useEffect } from 'react';
import BaseButton from 'components/BaseButton';
import BaseInput from 'components/BaseInput';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import { useRecipesContext } from 'context/RecipesContext';
import useDebounce from 'hooks/useDebounce';
import style from './RecipeSearch.module.scss';

const RecipeSearch: FC = () => {
  const { handleUpdateFilter, handleRecipeListState } = useRecipesContext();
  const [searchName, setSearchName] = useState('');
  const debouncedSearchName = useDebounce(searchName);

  const handleSearchName = (value: string) => {
    setSearchName(value);
  };

  const onClickSearchButton = () => {
    handleRecipeListState('loading');
  };

  useEffect(() => {
    handleUpdateFilter({ query: debouncedSearchName });
    handleRecipeListState('loading');
  }, [debouncedSearchName]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.content}>
          <Text className={style.title} view="p-l" align="center">
            Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every
            occasion, from <span style={{ textDecoration: 'underline' }}>weeknight dinners</span> to{' '}
            <span style={{ textDecoration: 'underline' }}>holiday feasts</span>.
          </Text>
          <BaseInput value={searchName} onChange={handleSearchName} className={style['name-search']} />
          <BaseButton onClick={onClickSearchButton}>
            <SearchIcon />
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
