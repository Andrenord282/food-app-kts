import classNames from 'classnames';
import { FC, InputHTMLAttributes, ReactNode, memo } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Text } from 'components';
import style from './FormInput.module.scss';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  validation: any;
  endSlot?: ReactNode;
  error?: FieldError;
};

const FormInput: FC<FormInputProps> = ({
  className,
  label,
  name,
  placeholder,
  register,
  validation,
  endSlot,
  error,
  ...props
}) => {
  return (
    <div className={classNames(className, style.item)}>
      {label && (
        <Text tag="span" view="p-xs" className={style.label}>
          {label}
        </Text>
      )}
      <div className={style.wrapper}>
        <input
          placeholder={placeholder}
          {...register(name, validation)}
          {...props}
          className={classNames(style.field, {
            error: error,
          })}
        />
        {endSlot && <span className={style.icon}>{endSlot}</span>}
      </div>
      {error && error?.message && (
        <Text tag="span" view="p-xxs" className={style.error}>
          {error?.message}
        </Text>
      )}
    </div>
  );
};

export default memo(FormInput);
