import cn from 'classnames';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MultiDropdown } from 'components';
import { MultiDropdownOption, initializeValue } from 'components/MultiDropdown';
import { rootStore } from 'store';
import { optionType } from './config';

type RecipeFilterTypePorps = {
  className?: string;
};

const RecipeFilterType: FC<RecipeFilterTypePorps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<MultiDropdownOption<string>[]>([]);

  useEffect(() => {
    const type = rootStore.query.getParam('type');
    if (!type) return;

    const initValue = initializeValue(type);
    
    setValue(initValue);
  }, []);

  const handleChangeValue = useCallback(
    (value: MultiDropdownOption<string>[]) => {
      setValue(value);
      const newValue = value.map(({ value }) => value).join(',');
      newValue ? searchParams.set('type', newValue) : searchParams.delete('type');
      searchParams.delete('page');
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
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
