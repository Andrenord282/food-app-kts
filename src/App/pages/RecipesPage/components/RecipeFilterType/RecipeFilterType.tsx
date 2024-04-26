import cn from 'classnames';
import { FC, memo, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MultiDropdown } from 'components';
import { MultiDropdownOption } from 'components/MultiDropdown';
import { useRecipesStoreContext } from 'context/RecipesStoreContext';
import { optionType } from './config';

type RecipeFilterTypePorps = {
  className?: string;
};

const RecipeFilterType: FC<RecipeFilterTypePorps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter, setFilter } = useRecipesStoreContext();
  const [value, setValue] = useState<MultiDropdownOption<string>[]>(filter.type);

  const handleChangeValue = useCallback(
    (value: MultiDropdownOption<string>[]) => {
      setValue(value);
      const newValue = value.map(({ value }) => value).join(',');
      setFilter('type', newValue);
      // сейчас я вынес в стор работу с значением query и убрал отсюда таймер
      // setSearchParams отрабатывает каждый раз и создает ререндер
      // я хочу работу с url search всю вынести в QueryParamsStore, подумаю как сделать это
      newValue ? searchParams.set('type', newValue) : searchParams.delete('type');
      searchParams.delete('page');
      setSearchParams(searchParams);
    },
    [setFilter, searchParams, setSearchParams],
  );

  const handleTitle = useCallback((values: MultiDropdownOption<string>[]) => {
    return values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ');
  }, []);

  return (
    <MultiDropdown
      data-name="Categories"
      className={cn(className)}
      options={optionType}
      value={value}
      onChange={handleChangeValue}
      setTitle={handleTitle}
    />
  );
};

export default memo(RecipeFilterType);
