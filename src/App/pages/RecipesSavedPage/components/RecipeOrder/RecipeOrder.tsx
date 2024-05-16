import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BaseCrossIcon, DescIcon, AscIcon, Icon, IconButton, SingleSelect } from 'components';
import { SingleSelectValue } from 'components/SingleSelect';
import { useRecipeSavedListContext } from 'context/RecipeSavedListContext';
import style from './RecipeOrder.module.scss';

const options: SingleSelectValue<string, string>[] = [
  { key: 'order by title', value: 'order by title' },
  { key: 'order by add', value: 'order by add' },
];

type RecipeOrderProps = {
  className?: string;
};

const RecipeOrder: FC<RecipeOrderProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterList } = useRecipeSavedListContext();
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState<SingleSelectValue<number | string, string> | null>(null);
  const [value, setValue] = useState<string>(filterList.orderName);
  const [type, setType] = useState<string>(filterList.orderType);

  const handleTitle = useCallback(() => {
    return value || 'set order';
  }, [value]);

  const handleChangeSelect = useCallback(
    (select: SingleSelectValue<number | string, string>) => {
      if (select.value !== selected?.value) {
        setValue(select.value);
        setSelected(select);
      } else {
        setValue('');
        setSelected(null);
      }
      const updatedSelect = select.value === 'order by title' ? 'title' : 'createdAt';
      searchParams.delete('page-saved');
      searchParams.set('order-name', updatedSelect);
      setSearchParams(searchParams);
    },
    [selected, searchParams, setSearchParams],
  );

  const handleCangeType = useCallback(() => {
    const updatedType = type === 'asc' ? 'desc' : 'asc';
    setType(updatedType);
    searchParams.delete('page-saved');
    searchParams.set('order-type', updatedType);
    setSearchParams(searchParams);
  }, [type, searchParams, setSearchParams]);

  const handleResetSelect = useCallback(() => {
    setValue('');
    setSelected(null);
    setToggle(false);
    searchParams.delete('page-saved');
    searchParams.delete('order-name');
    searchParams.delete('order-type');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleChangeValue = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleChangeToggle = useCallback((toggle?: boolean) => {
    if (toggle) {
      setToggle(toggle);
      return;
    }
    setToggle((oldToggle) => !oldToggle);
  }, []);

  return (
    <div className={cn(className, style.block)}>
      <SingleSelect
        className={style.item}
        toggle={toggle}
        selected={selected}
        options={options}
        value={value}
        filterActive={false}
        onChangeToggle={handleChangeToggle}
        onChangeValue={handleChangeValue}
        onChangeSelect={handleChangeSelect}
        setTitle={handleTitle}
        endSlot={
          value && (
            <IconButton onClick={handleResetSelect}>
              <BaseCrossIcon />
            </IconButton>
          )
        }
      />
      <IconButton onClick={handleCangeType}>
        <Icon viewBox="0 0 16 16">
          {type === 'asc' && <AscIcon />}
          {type === 'desc' && <DescIcon />}
        </Icon>
      </IconButton>
    </div>
  );
};

export default observer(RecipeOrder);
