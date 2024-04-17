import classNames from 'classnames';
import { FC, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import style from './BaseButton.module.scss';
import LoaderIcon from 'components/icons/LoaderIcon';

type BaseButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    loading?: boolean;
  }
>;

const BaseButton: FC<BaseButtonProps> = ({ disabled, loading, className, children, onClick, ...props }) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={classNames(className, style.button, {
        [style.disabled]: disabled,
      })}
      {...props}
    >
      {loading && <LoaderIcon width={24} height={24} />}
      {children}
    </button>
  );
};

export default BaseButton;
