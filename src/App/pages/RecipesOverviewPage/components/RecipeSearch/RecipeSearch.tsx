import { observer } from 'mobx-react-lite';
import { FC, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SingleSelect, IconButton, BaseCrossIcon } from 'components';
import { SingleSelectValue } from 'components/SingleSelect';
import { RecipeSearchStore } from 'store';
import { useLocalStore } from 'utils';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    searchValue,
    searchOptions,
    updateSearchValue,
    resetSearchOptions,
    selectSearchValue,
  } = useLocalStore(() => new RecipeSearchStore('query-overview'));
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState<SingleSelectValue<number | string, string> | null>(null);
  const [value, setValue] = useState<string>(searchValue);

  const handleTitle = useCallback(() => {
    return value || 'Enter the name of the dish';
  }, [value]);

  const handleChangeSelect = useCallback(
    (selected: SingleSelectValue<number | string, string>) => {
      setValue(selected.value);
      setSelected(selected);
      resetSearchOptions();
      selectSearchValue(selected.value);
      searchParams.set('query-overview', selected.value);
      searchParams.delete('page-overview');
      setSearchParams(searchParams);
    },
    [resetSearchOptions, selectSearchValue, searchParams, setSearchParams],
  );

  const handleResetSelect = useCallback(() => {
    setValue('');
    setSelected(null);
    resetSearchOptions();
    selectSearchValue('');
    searchParams.delete('query-overview');
    searchParams.delete('page-overview');
    setSearchParams(searchParams);
    setToggle(false);
  }, [resetSearchOptions, selectSearchValue, searchParams, setSearchParams]);

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value);
      updateSearchValue(value);
    },
    [updateSearchValue],
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
      className={className}
      helperText={isError ? 'something went wrong' : isSuccess && isEmpty ? 'name not found' : ''}
      endSlot={
        value && (
          <IconButton onClick={handleResetSelect}>
            <BaseCrossIcon />
          </IconButton>
        )
      }
    />
  );
};

export default observer(RecipeSearch);
