import cn from 'classnames';
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { BaseButton, BaseInput,  ArrowDownIcon } from 'components';
import style from './MultiDropdown.module.scss';

export type MultiDropdownOption<T> = {
  key: T;
  value: T;
};

export type MultiDropdownProps = {
  className?: string;
  options: MultiDropdownOption<string>[];
  value: MultiDropdownOption<string>[];
  disabled?: boolean;
  onChange: (value: MultiDropdownOption<string>[]) => void;
  setTitle: (value: MultiDropdownOption<string>[]) => string;
};

export const initializeValue = (value: string): MultiDropdownOption<string>[] => {
  if (!value) return [];
  return value.split(',').map((string) => ({
    key: string,
    value: string,
  }));
};

const MultiDropdown: FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  disabled,
  onChange,
  setTitle,
  ...props
}) => {
  const MultiDropdownRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [multiInputValue, setMultiInputValue] = useState('');

  const selectedKeys = useMemo(() => {
    const keys = value.map((option) => option.key);
    return new Set(keys);
  }, [value]);

  const multiInputTitle = useMemo(() => {
    if (value.length > 0 && !toggle) {
      return setTitle(value);
    }
    return '';
  }, [setTitle, value, toggle]);

  const multiInputPlaceholder = useMemo(() => {
    return setTitle(value);
  }, [setTitle, value]);

  const handleToggleOptionList = () => {
    setToggle((oldToggle) => !oldToggle);
  };

  const handleOnChange = (value: string) => {
    setMultiInputValue(value);
  };

  const handleSelectValue = (selectValue: MultiDropdownOption<string>) => {
    if (selectedKeys.has(selectValue.key)) {
      const newValue = value.filter(({ key }) => key !== selectValue.key);
      onChange(newValue);
      return;
    }
    const newValue = [...value, selectValue];
    onChange(newValue);
  };

  useEffect(() => {
    const MultiDropdown = MultiDropdownRef.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (MultiDropdown && !MultiDropdown.contains(e.target as Node)) {
        if (toggle) handleToggleOptionList();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [MultiDropdownRef, toggle]);

  return (
    <div
      {...props}
      ref={MultiDropdownRef}
      onClick={(e) => e.stopPropagation()}
      className={cn(className, style['multi-drop-down'])}
    >
      <BaseInput
        className={style.input}
        value={multiInputValue || multiInputTitle}
        onChange={handleOnChange}
        onFocus={handleToggleOptionList}
        placeholder={multiInputPlaceholder}
        disabled={disabled}
        endSlot={<ArrowDownIcon color="secondary" />}
      />
      {toggle && options && options.length > 0 && !disabled && (
        <div className={style.list}>
          {options.map((option, index) => {
            const className = cn(style.item, {
              [style['item--selected']]: value.some((item) => item.value === option.value),
            });

            switch (true) {
              case multiInputValue && option.value.startsWith(multiInputValue):
                return (
                  <BaseButton
                    key={option.key}
                    onClick={() => handleSelectValue(option)}
                    data-option-index={index}
                    className={className}
                  >
                    {option.value}
                  </BaseButton>
                );
              case !multiInputValue:
                return (
                  <BaseButton
                    key={option.key}
                    onClick={() => handleSelectValue(option)}
                    data-option-index={index}
                    className={className}
                  >
                    {option.value}
                  </BaseButton>
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default memo(MultiDropdown);
