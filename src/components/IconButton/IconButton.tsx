import cn from 'classnames';
import { ButtonHTMLAttributes, FC, PropsWithChildren, memo } from 'react';
import LoaderIcon from 'components/icons/LoaderIcon';
import style from './IconsButton.module.scss';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    loading?: boolean;
  }
>;

const IconButton: FC<IconButtonProps> = ({ disabled, loading, className, children, onClick, ...props }) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}
      className={cn(className, style.button, {
        [style['button--disabled']]: disabled,
      })}
    >
      {loading && <LoaderIcon width={24} height={24} />}
      {!loading && children}
    </button>
  );
};

export default memo(IconButton);
