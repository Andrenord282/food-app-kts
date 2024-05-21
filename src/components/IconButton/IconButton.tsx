import cn from 'classnames';
import { ButtonHTMLAttributes, FC, PropsWithChildren, memo } from 'react';
import LoaderIcon from 'components/icons/LoaderIcon';
import style from './IconButton.module.scss';
import { Icon } from 'components';

type IconButtonVariant = 'primary' | 'accent';
type IconButtonPadding = 'none' | 'l';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: IconButtonVariant;
    className?: string;
    loading?: boolean;
    padding?: IconButtonPadding;
    height?: number;
    width?: number;
  }
>;

const IconButton: FC<IconButtonProps> = ({
  variant = 'primary',
  disabled,
  loading,
  className,
  padding = 'l',
  children,
  height = 24,
  width = 24,
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
      {loading && (
        <Icon width={width} height={height} viewBox="0 0 16 16" className="loader-icon">
          <LoaderIcon />
        </Icon>
      )}
      {!loading && children}
    </button>
  );
};

export default memo(IconButton);
