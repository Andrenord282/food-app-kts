import cn from 'classnames';
import { ButtonHTMLAttributes, FC, PropsWithChildren, memo } from 'react';
import LoaderIcon from 'components/icons/LoaderIcon';
import style from './IconsButton.module.scss';

type IconButtonVariant = 'primary' | 'accent';
type IconButtonPadding = 'none' | 'l';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: IconButtonVariant;
    className?: string;
    loading?: boolean;
    padding?: IconButtonPadding;
  }
>;

const IconButton: FC<IconButtonProps> = ({
  variant = 'primary',
  disabled,
  loading,
  className,
  padding = 'l',
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}
      className={cn(className, style.button, style[`button--padding-${padding}`], style[`button--${variant}`], {
        [style['button--disabled']]: disabled,
      })}
    >
      {loading && <LoaderIcon width={24} height={24} />}
      {!loading && children}
    </button>
  );
};

export default memo(IconButton);
