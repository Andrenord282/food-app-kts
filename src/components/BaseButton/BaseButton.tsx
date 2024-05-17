import cn from 'classnames';
import { FC, ButtonHTMLAttributes, PropsWithChildren, memo } from 'react';
import { Text } from 'components';
import LoaderIcon from 'components/icons/LoaderIcon';
import style from './BaseButton.module.scss';

type BaseButtonSize = 'm' | 'l';

type BaseButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    size?: BaseButtonSize;
    loading?: boolean;
    loadingText?: string;
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
        [style['button--d']]: disabled,
      })}
      {...props}
    >
      {loading && <LoaderIcon width={24} height={24} />}
      <Text tag="span" view={`button-${size}`}>
        {loading ? loadingText : children}
      </Text>
    </button>
  );
};

export default memo(BaseButton);
