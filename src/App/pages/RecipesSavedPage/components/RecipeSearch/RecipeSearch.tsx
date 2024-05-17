import { observer } from 'mobx-react-lite';
import { FC, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BaseCrossIcon, BaseInput, Icon, IconButton, LoaderIcon } from 'components';
import { useRecipeSavedListContext } from 'context/RecipeSavedListContext';

type RecipeSearchProps = {
  className?: string;
};

const RecipeSearch: FC<RecipeSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, filterList } = useRecipeSavedListContext();
  const [value, setValue] = useState<string>(filterList.title);

  const handleResetValue = useCallback(() => {
    setValue('');
    searchParams.delete('query-saved');
    searchParams.delete('page-saved');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value);
      searchParams.set('query-saved', value);
      searchParams.delete('page-saved');
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <BaseInput
      className={className}
      value={value}
      placeholder={'Enter the name of the saved dish'}
      onChange={handleChangeValue}
      endSlot={
        isLoading ? (
          <Icon width={40} height={40} viewBox="0 0 16 16" className="loader-icon">
            <LoaderIcon />
          </Icon>
        ) : (
          value && (
            <IconButton onClick={handleResetValue}>
              <BaseCrossIcon />
            </IconButton>
          )
        )
      }
    />
  );
};

export default observer(RecipeSearch);
