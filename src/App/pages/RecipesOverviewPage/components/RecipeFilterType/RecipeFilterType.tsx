import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowDownIcon, BaseCrossIcon, IconButton, MultiSelect } from 'components';
import { MultiSelectValue } from 'components/MultiSelect';
import { RecipeFilterStore } from 'store';
import { useLocalStore } from 'utils';
import { types } from './config';
import style from './RecipeFilterType.module.scss';

type RecipeFilterTypePorps = {
  className?: string;
};

const RecipeFilterType: FC<RecipeFilterTypePorps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterOptions, filterSelected, updateFilter } = useLocalStore(() => new RecipeFilterStore('type', types));
  const [toggle, setToggle] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const options = useMemo(() => filterOptions, [filterOptions]);
  const selected = useMemo(() => filterSelected, [filterSelected]);

  const handleChangeToggle = useCallback((toggle?: boolean) => {
    if (toggle) {
      setToggle(toggle);
      return;
    }
    setToggle((oldToggle) => !oldToggle);
    setValue('');
  }, []);

  const handleChangeSelect = useCallback(
    (selected: MultiSelectValue<string, string>[]) => {
      updateFilter(selected);
      const updatedSelect = selected.map(({ value }) => value).join(',');
      updatedSelect ? searchParams.set('type', updatedSelect) : searchParams.delete('type');
      setSearchParams(searchParams);
    },
    [updateFilter, searchParams, setSearchParams],
  );

  const handleResetSelect = useCallback(() => {
    updateFilter([]);
    searchParams.delete('type');
    setSearchParams(searchParams);
  }, [updateFilter, searchParams, setSearchParams]);

  const handleChangeValue = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleTitle = useCallback(() => {
    return selected.length === 0 ? 'Categories' : selected.map(({ value }) => value).join(', ');
  }, [selected]);

  return (
    <MultiSelect
      toggle={toggle}
      selected={selected}
      options={options}
      value={value}
      onChangeToggle={handleChangeToggle}
      onChangeValue={handleChangeValue}
      onChangeSelect={handleChangeSelect}
      setTitle={handleTitle}
      helperText={toggle ? 'you can choose multiple categories' : ''}
      matchStartString
      className={cn(className)}
      endSlot={
        selected.length > 0 && !toggle ? (
          <IconButton onClick={handleResetSelect}>
            <BaseCrossIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleChangeToggle()}>
            <ArrowDownIcon
              className={cn(style.icon, {
                [style['is-open']]: toggle,
              })}
            />
          </IconButton>
        )
      }
    />
  );
};

export default observer(RecipeFilterType);
