import cn from 'classnames';
import { ChangeEventHandler, FC, InputHTMLAttributes, memo } from 'react';
import { Icon, CheckIcon, LoaderIcon } from 'components';
import style from './CheckBox.module.scss';

export type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  className?: string;
  loading?: boolean;
  onChange: (checked: boolean) => void;
};

const CheckBox: FC<CheckBoxProps> = ({ className = '', loading, onChange, checked, disabled, ...props }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.checked;
    onChange(value);
  };

  return (
    <label
      className={cn(className, style['check-box'], {
        [style['check-box--disabled']]: disabled,
      })}
    >
      <input
        type="checkbox"
        onChange={disabled ? undefined : handleChange}
        className={style.field}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      {loading && (
        <Icon viewBox="0 0 16 16" className={cn(style.icon, { [style['icon--loading']]: loading }, 'loader-icon')}>
          <LoaderIcon />
        </Icon>
      )}
      {checked && !loading && (
        <Icon className={cn(style.icon, { [style['icon--checked']]: checked })}>
          <CheckIcon height={20} width={20} />
        </Icon>
      )}
    </label>
  );
};

export default memo(CheckBox);
