import cn from 'classnames';
import { FC, ButtonHTMLAttributes, PropsWithChildren, memo } from 'react';
import { Icon, Text } from 'components';
import LoaderIcon from 'components/icons/LoaderIcon';
import style from './BaseButton.module.scss';

type BaseButtonSize = 's' | 'm' | 'l';

type BaseButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    size?: BaseButtonSize;
    loading?: boolean;
    loadingText?: string;
    loadingHiddenText?: boolean;
  }
>;

const BaseButton: FC<BaseButtonProps> = ({
  disabled,
  loading,
  loadingText,
  className,
  size = 'm',
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={cn(className, style.button, style[`button--${size}`], {
        [style['button--disabled']]: disabled,
      })}
      {...props}
    >
      {loading && (
        <Icon viewBox="0 0 16 16" className="loader-icon">
          <LoaderIcon />
        </Icon>
      )}
      <Text tag="span" view={`button-${size}`}>
        {loading && loadingText ? loadingText : children}
      </Text>
    </button>
  );
};

export default memo(BaseButton);
