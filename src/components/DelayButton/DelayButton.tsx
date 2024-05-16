import cn from 'classnames';
import { FC, ButtonHTMLAttributes, PropsWithChildren, memo, useEffect, CSSProperties, useMemo } from 'react';
import { Text } from 'components';
import LoaderIcon from 'components/icons/LoaderIcon';
import { IntervalStore } from 'store';
import { useLocalStore } from 'utils';
import style from './DelayButton.module.scss';

type DelayButtonSize = 's' | 'm' | 'l';

type DelayButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    size?: DelayButtonSize;
    loading?: boolean;
    delayActive: boolean;
    delay?: number;
    delayText?: string;
    loadingText?: string;
    loadingHiddenText?: boolean;
    handlerDelay: () => void;
  }
>;

const DelayButton: FC<DelayButtonProps> = ({
  disabled,
  loading,
  delayActive,
  delay = 500,
  loadingText,
  delayText,
  className,
  size = 'm',
  children,
  onClick,
  handlerDelay,
  ...props
}) => {
  const intervalStore = useLocalStore(() => new IntervalStore());

  const delayInlineStyle: CSSProperties = useMemo(() => {
    if (delayActive) {
      return {
        transition: `all ${delay / 1000}s linear`,
      };
    }
    return {
      transition: `all 0s linear`,
    };
  }, [delay, delayActive]);

  useEffect(() => {
    if (delayActive) {
      intervalStore.startTimeout(() => {
        handlerDelay();
      }, delay);
    }

    if (!delayActive) {
      intervalStore.stop();
    }
  }, [delay, delayActive, handlerDelay, intervalStore]);

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={cn(className, style.button, style[`button--${size}`], {
        [style['button--disabled']]: disabled,
      })}
      {...props}
    >
      <div
        className={cn(style.delay, {
          [style['delay--active']]: delayActive,
        })}
        style={delayInlineStyle}
      ></div>
      {loading && <LoaderIcon width={24} height={24} />}
      {!delayActive && !loading && (
        <Text tag="span" view={`button-${size}`}>
          {children}
        </Text>
      )}
      {delayActive && !loading && (
        <Text tag="span" view={`button-${size}`}>
          {delayText ? delayText : children}
        </Text>
      )}
      {loading && (
        <Text tag="span" view={`button-${size}`}>
          {loadingText ? loadingText : children}
        </Text>
      )}
    </button>
  );
};

export default memo(DelayButton);
