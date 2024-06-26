import cn from 'classnames';
import { FC, ReactNode, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Text, LoaderIcon, BaseButton, BaseInput, Icon } from 'components';
import style from './SingleSelect.module.scss';

export type SingleSelectValue<U, T> = {
  key: U;
  value: T;
};

type SingleSelectProps = {
  className?: string;
  matchStartString?: boolean;
  options: SingleSelectValue<number | string, string>[] | [];
  optionStyle?: 'row' | 'grid';
  toggle: boolean;
  value: string;
  selected: SingleSelectValue<number | string, string> | null;
  disabled?: boolean;
  loading?: boolean;
  endSlot?: ReactNode;
  helperText?: string;
  filterActive?: boolean;
  onChangeToggle: (toggle?: boolean) => void;
  onChangeValue: (value: string) => void;
  onChangeSelect: (selected: SingleSelectValue<number | string, string>) => void;
  setTitle: (selected: SingleSelectValue<number | string, string> | null) => string;
};

const SingleSelect: FC<SingleSelectProps> = ({
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
  filterActive = true,
  onChangeValue,
  onChangeToggle,
  onChangeSelect,
  setTitle,
  ...props
}) => {
  const singleSelectRef = useRef<HTMLDivElement>(null);
  const title = useMemo(() => {
    return setTitle(selected);
  }, [selected, setTitle]);

  const filteredOptions = useMemo(() => {
    if (filterActive && value) {
      const str = value.toLowerCase();
      if (matchStartString) {
        return options.filter((option) => option.value.toLowerCase().indexOf(str) === 0);
      }
      return options.filter((option) => option.value.toLowerCase().includes(str));
    } else {
      return options;
    }
  }, [filterActive, value, matchStartString, options]);

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
    (select: SingleSelectValue<number | string, string>) => {
      onChangeSelect(select);
      onChangeToggle(false);
    },
    [onChangeSelect, onChangeToggle],
  );

  useEffect(() => {
    const singleSelect = singleSelectRef.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (singleSelect && !singleSelect.contains(e.target as Node)) {
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
    <div className={cn(className, style['single-select'])} ref={singleSelectRef} {...props}>
      <BaseInput
        value={!toggle && selected ? title : value}
        placeholder={title}
        onFocus={handleFocus}
        onChange={handleChangeValue}
        endSlot={
          loading ? (
            <Icon width={40} height={40} viewBox="0 0 16 16" className="loader-icon">
              <LoaderIcon />
            </Icon>
          ) : (
            endSlot
          )
        }
      />
      {helperText && (
        <Text tag="span" view="p-xxs">
          {helperText}
        </Text>
      )}
      <div className={style['wrapper-list']}>
        <CSSTransition
          in={filteredOptions.length > 0 && toggle && !disabled}
          timeout={300}
          mountOnEnter
          unmountOnExit
          classNames={{
            enterActive: style['enter--active'],
            exitActive: style['exit--active'],
          }}
        >
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
        </CSSTransition>
      </div>
    </div>
  );
};

export default memo(SingleSelect);
