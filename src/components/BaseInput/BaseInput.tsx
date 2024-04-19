import cn from 'classnames';
import { forwardRef, InputHTMLAttributes, ChangeEventHandler, ReactNode } from 'react';
import style from './BaseInput.module.scss';

export type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  endIconSlot?: ReactNode;
};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, value, onChange, endIconSlot, ...props }, ref) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      onChange(value);
    };

    return (
      <div className={cn(className, style.item)}>
        <input ref={ref} type="text" className={style.field} value={value} onChange={handleChange} {...props} />
        {endIconSlot && <span className={style.icon}>{endIconSlot}</span>}
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
export default BaseInput;
