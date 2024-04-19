import cn from 'classnames';
import { FC, useState } from 'react';
import MultiDropdown, { MultiDropdownOption } from 'components/MultiDropdown';
import { useRecipesContext } from 'context/RecipesContext';

const optionType: MultiDropdownOption[] = [
  { key: 'main course', value: 'main course' },
  { key: 'side dish', value: 'side dish' },
  { key: 'dessert', value: 'dessert' },
  { key: 'appetizer', value: 'appetizer' },
  { key: 'salad', value: 'salad' },
  { key: 'bread', value: 'bread' },
  { key: 'breakfast', value: 'breakfast' },
  { key: 'soup', value: 'soup' },
  { key: 'beverage', value: 'beverage' },
  { key: 'sauce', value: 'sauce' },
  { key: 'marinade', value: 'marinade' },
  { key: 'fingerfood', value: 'fingerfood' },
  { key: 'snack', value: 'snack' },
  { key: 'drink', value: 'drink' },
];

type RecipeFilterTypePorps = {
  className?: string;
};

const RecipeFilterType: FC<RecipeFilterTypePorps> = ({ className }) => {
  const { handleUpdateFilter } = useRecipesContext();
  const [valueType, setValueType] = useState<MultiDropdownOption[]>([]);

  const handleChangeValueType = (values: MultiDropdownOption[]) => {
    setValueType(values);
    handleUpdateFilter({ type: values.map(({ value }) => value) });
  };

  const handleTitleValueType = (values: MultiDropdownOption[]) => {
    return values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ');
  };

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

export default RecipeFilterType;
