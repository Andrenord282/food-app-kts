import classNames from 'classnames';
import { FC, ButtonHTMLAttributes } from 'react';
import { Text } from '@/ui';
import '../style/BaseButton.scss';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    text: string;
};

const BaseButton: FC<BaseButtonProps> = ({ disabled, className, text, onClick, ...props }) => {
    return (
        <button
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            className={classNames(className, 'base-button', {
                'base-button--disabled': disabled,
            })}
            {...props}
        >
            <Text tag="span" view="button-m">
                {text}
            </Text>
        </button>
    );
};

export { BaseButton };
