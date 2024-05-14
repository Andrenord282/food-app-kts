import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Text, SingleSelect, IconButton, BaseCrossIcon } from 'components';
import { SingleSelectValue } from 'components/SingleSelect';
import { useRecipesOverviewList } from 'context';
import { RecipeSearchStore } from 'store';
import { useLocalStore } from 'utils';
import style from './RecipeSearch.module.scss';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, isSuccess, isError, isEmpty, searchValue, searchOptions, setSearchValue, resetSearchOptions } =
    useLocalStore(() => new RecipeSearchStore('query'));
  const { setFilter } = useRecipesOverviewList();
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState<SingleSelectValue<number, string> | null>(null);
  const [value, setValue] = useState<string>(searchValue);

  const handleTitle = useCallback(() => {
    return value || 'Enter the name of the dish';
  }, [value]);

  const handleChangeSelect = useCallback(
    (selected: SingleSelectValue<number, string>) => {
      setValue(selected.value);
      setSelected(selected);

      setFilter('query', selected.value);
      resetSearchOptions();

      searchParams.set('query', selected.value);
      searchParams.delete('page');
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, setFilter, resetSearchOptions],
  );

  const handleResetSelect = useCallback(() => {
    setSelected(null);
    setValue('');

    resetSearchOptions();
    setFilter('query', '');
    setToggle(false);

    searchParams.delete('query');
    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, setFilter, resetSearchOptions]);

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value);
      setSearchValue(value);
    },
    [setSearchValue],
  );

  const handleChangeToggle = useCallback(
    (toggle?: boolean) => {
      resetSearchOptions();
      if (toggle) {
        setToggle(toggle);
        return;
      }
      setToggle((oldToggle) => !oldToggle);
    },
    [resetSearchOptions],
  );

  return (
    <div className={cn(className, style.section)}>
      <Text className={style.title} view="p-l" align="center">
        Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every occasion,
        from <span style={{ textDecoration: 'underline' }}>weeknight dinners</span> to{' '}
        <span style={{ textDecoration: 'underline' }}>holiday feasts</span>.
      </Text>
      <SingleSelect
        loading={isLoading}
        toggle={toggle}
        selected={selected}
        options={searchOptions}
        value={value}
        onChangeToggle={handleChangeToggle}
        onChangeValue={handleChangeValue}
        onChangeSelect={handleChangeSelect}
        setTitle={handleTitle}
        optionStyle="grid"
        className={style.search}
        helperText={isError ? 'something went wrong' : isSuccess && isEmpty ? 'name not found' : ''}
        endSlot={
          value && (
            <IconButton onClick={handleResetSelect}>
              <BaseCrossIcon />
            </IconButton>
          )
        }
      />
    </div>
  );
};

export default observer(RecipeSearch);
