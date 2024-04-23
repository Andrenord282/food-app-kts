import cn from 'classnames';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MultiDropdown, { MultiDropdownOption } from 'components/MultiDropdown';
import { useRecipesStoreContext } from 'context/RecipesStoreContext';
import rootStore from 'store/RootStore';
import { optionType } from './config';

type RecipeFilterTypePorps = {
  className?: string;
};

const RecipeFilterType: FC<RecipeFilterTypePorps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setFilter } = useRecipesStoreContext();
  const [valueType, setValueType] = useState<MultiDropdownOption[]>([]);

  useEffect(() => {
    const type = rootStore.query.getParam('type');
    if (!type) return;
    
    const initValueType = type.split(',').reduce((acc, item) => {
      const value: MultiDropdownOption = {
        key: item,
        value: item,
      };
      acc.push(value);
      return acc;
    }, [] as MultiDropdownOption[]);

    setValueType(initValueType);
  }, []);

  const handleChangeType = useCallback(
    (values: MultiDropdownOption[]) => {
      setValueType(values);
      const newType = values.map(({ value }) => value).join(',');
      setFilter('type', newType);

      if (newType) {
        searchParams.set('type', newType);
      } else {
        searchParams.delete('type');
      }
      setSearchParams(searchParams);
    },
    [setFilter, searchParams, setSearchParams],
  );

  const handleTitleType = useCallback((values: MultiDropdownOption[]) => {
    return values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ');
  }, []);

  return (
    <MultiDropdown
      data-name="Categories"
      className={cn(className)}
      options={optionType}
      value={valueType}
      onChange={handleChangeType}
      setTitle={handleTitleType}
    />
  );
};

export default memo(RecipeFilterType);
