import cn from 'classnames';
import { FC, memo, useCallback, useState } from 'react';
import MultiDropdown, { MultiDropdownOption } from 'components/MultiDropdown';
import { useRecipesStoreContext } from 'context/RecipesStoreContext';
import { optionType } from './config';

type RecipeFilterTypePorps = {
  className?: string;
};

const RecipeFilterType: FC<RecipeFilterTypePorps> = ({ className }) => {
  // const { handleUpdateFilter } = useRecipesStoreContext();
  const [valueType, setValueType] = useState<MultiDropdownOption[]>([]);

  // const handleChangeValueType = useCallback(
  //   (values: MultiDropdownOption[]) => {
  //     setValueType(values);
  //     handleUpdateFilter({ type: values.map(({ value }) => value) });
  //   },
  //   [handleUpdateFilter],
  // );

  const handleTitleValueType = useCallback((values: MultiDropdownOption[]) => {
    return values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ');
  }, []);

  return (
    <MultiDropdown
      data-name="Categories"
      className={cn(className)}
      options={optionType}
      value={valueType}
      onChange={handleChangeValueType}
      setTitle={handleTitleValueType}
    />
  );
};

export default memo(RecipeFilterType);
