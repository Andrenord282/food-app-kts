import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, LoaderIcon, BaseButton, BaseInput } from 'components';
import style from './MultiSelect.module.scss';

export type MultiSelectValue<U, T> = {
  key: U;
  value: T;
};

type MultiSelectProps = {
  className?: string;
  matchStartString?: boolean;
  options: MultiSelectValue<string, string>[];
  optionStyle?: 'row' | 'grid';
  toggle: boolean;
  value: string;
  selected: MultiSelectValue<string, string>[];
  disabled?: boolean;
  loading?: boolean;
  endSlot?: ReactNode;
  helperText?: string;
  onChangeToggle: (toggle?: boolean) => void;
  onChangeValue: (value: string) => void;
  onChangeSelect: (selected: MultiSelectValue<string, string>[]) => void;
  setTitle: (selected: MultiSelectValue<string, string>[]) => string;
};

const MultiSelect: FC<MultiSelectProps> = ({
  className,
  matchStartString = false,
  options,
  optionStyle = 'row',
  toggle,
  value,
  selected,
  disabled,
  loading,
  endSlot,
  helperText,
  onChangeValue,
  onChangeToggle,
  onChangeSelect,
  setTitle,
  ...props
}) => {
  const multiSelectRef = useRef<HTMLDivElement>(null);
  const inputSelectRef = useRef<HTMLInputElement>(null);

  const title = useMemo(() => {
    return setTitle(selected);
  }, [selected, setTitle]);

  const selectedKeys = useMemo(() => {
    const keys = selected.map(({ key }) => key);
    return new Set(keys);
  }, [selected]);

  const filteredOptions = useMemo(() => {
    const str = value.toLowerCase();
    if (matchStartString) {
      return options.filter((option) => option.value.toLowerCase().indexOf(str) === 0);
    }
    return options.filter((option) => option.value.toLowerCase().includes(str));
  }, [value, matchStartString, options]);

  const handleFocus = () => {
    onChangeToggle(true);
  };

  const handleChangeValue = useCallback(
    (value: string) => {
      onChangeValue(value);
    },
    [onChangeValue],
  );

  const handleSelectValue = useCallback(
    (select: MultiSelectValue<string, string>) => {
      if (selectedKeys.has(select.key)) {
        const updatesSelect = selected.filter(({ key }) => key !== select.key);
        onChangeSelect(updatesSelect);
        return;
      }
      const updatesSelect = [...selected, select];
      onChangeSelect(updatesSelect);
      inputSelectRef.current?.focus();
    },
    [selected, selectedKeys, onChangeSelect],
  );

  useEffect(() => {
    const multiSelect = multiSelectRef.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (multiSelect && !multiSelect.contains(e.target as Node)) {
        if (toggle) {
          onChangeToggle(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggle, onChangeValue, onChangeToggle]);

  return (
    <div className={cn(className, style['multi-select'])} ref={multiSelectRef} {...props}>
      <BaseInput
        ref={inputSelectRef}
        value={!toggle && selected.length > 0 ? title : value}
        placeholder={title}
        onFocus={handleFocus}
        onChange={handleChangeValue}
        endSlot={loading ? <LoaderIcon width={40} height={40} /> : endSlot}
      />
      {helperText && (
        <Text tag="span" view="p-xxs" className={style['helper-text']}>
          {helperText}
        </Text>
      )}
      {toggle && filteredOptions.length > 0 && !disabled && (
        <div className={cn(style.list, style[`list--${optionStyle}`])}>
          {filteredOptions.map(({ key, value }) => {
            return (
              <BaseButton
                key={key}
                onClick={() => handleSelectValue({ key, value })}
                className={cn(style.item, {
                  [style['item--selected']]: selectedKeys.has(key),
                })}
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

export default observer(MultiSelect);
