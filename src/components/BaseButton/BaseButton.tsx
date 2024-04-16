import classNames from 'classnames';
import { FC, ButtonHTMLAttributes } from 'react';
import Text from 'components/Text';
import style from './BaseButton.module.scss';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  text: string;
};

const BaseButton: FC<BaseButtonProps> = ({ disabled, className, text, onClick, ...props }) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={classNames(className, style.button, {
        [style.disabled]: disabled,
      })}
      {...props}
    >
      <Text tag="span" view="button-m">
        {text}
      </Text>
    </button>
  );
};

export default BaseButton;
