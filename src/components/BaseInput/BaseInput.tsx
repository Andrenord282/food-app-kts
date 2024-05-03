import cn from 'classnames';
import { forwardRef, InputHTMLAttributes, ChangeEventHandler, ReactNode, memo, useCallback } from 'react';
import * as style from './BaseInput.module.scss';

export type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  endSlot?: ReactNode;
};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, value, onChange, endSlot, ...props }, ref) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        const value = e.target.value;
        onChange(value);
      },
      [onChange],
    );

    return (
      <div className={cn(className, style.item)}>
        <input ref={ref} type="text" className={style.field} value={value} onChange={handleChange} {...props} />
        {endSlot && <span className={style.icon}>{endSlot}</span>}
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';

export default memo(BaseInput);
