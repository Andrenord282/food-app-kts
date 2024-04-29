import cn from 'classnames';
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownIcon, BaseButton, BaseInput, IconButton } from 'components';
import style from './SingleSelect.module.scss';

export type SingleSelectValue<U, T> = {
  key: U;
  value: T;
};

type SingleSelectProps = {
  className?: string;
  options: SingleSelectValue<number, string>[];
  optionStyle?: 'row' | 'grid';
  value: string;
  selected: SingleSelectValue<number, string> | null;
  disabled?: boolean;
  onChangeValue: (value: string) => void;
  onChangeSelect: (selected: SingleSelectValue<number, string>) => void;
  setTitle: (selected: SingleSelectValue<number, string> | null) => string;
};

const SingleSelect: FC<SingleSelectProps> = ({
  className,
  options,
  optionStyle = 'row',
  value,
  selected,
  disabled,
  onChangeValue,
  onChangeSelect,
  setTitle,
  ...props
}) => {
  const singleSelectRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);

  const title = useMemo(() => {
    return setTitle(selected);
  }, [selected, setTitle]);

  const filteredOptions = useMemo(() => {
    const str = value.toLowerCase();
    return options.filter((option) => option.value.toLowerCase().indexOf(str) === 0);
  }, [value, options]);

  const handleToggle = () => {
    setToggle((oldToggle) => !oldToggle);
  };

  const handleFocus = () => {
    setToggle(true);
  };

  const handleChangeValue = (value: string) => {
    onChangeValue(value);
  };

  const handleSelectValue = (select: SingleSelectValue<number, string>) => {
    onChangeSelect(select);
    handleToggle();
  };

  useEffect(() => {
    const singleSelect = singleSelectRef.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (singleSelect && !singleSelect.contains(e.target as Node)) {
        setToggle(false);
        onChangeValue('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn(className, style['single-select'])} ref={singleSelectRef} {...props}>
      <BaseInput
        value={!toggle && selected ? title : value}
        placeholder={title}
        onFocus={handleFocus}
        onChange={handleChangeValue}
        endIconSlot={
          <IconButton onClick={handleToggle}>
            <ArrowDownIcon />
          </IconButton>
        }
      />
      {toggle && filteredOptions.length > 0 && !disabled && (
        <div className={cn(style.list, style[`list--${optionStyle}`])}>
          {filteredOptions.map(({ key, value }) => {
            const isSelected = cn(style.item, {
              [style['item--selected']]: key === selected?.key,
            });

            return (
              <BaseButton
                key={key}
                onClick={() => handleSelectValue({ key, value })}
                className={cn(isSelected, style.item)}
              >
                {value}
              </BaseButton>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(SingleSelect);
