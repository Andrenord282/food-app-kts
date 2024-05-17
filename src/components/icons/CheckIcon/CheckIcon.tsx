import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const CheckIcon: FC<IconProps> = ({ color, ...props }) => {
  return (
    <path
      d="M4 11.6129L9.87755 18L20 7"
      stroke={cn({
        currentColor: !color,
        '#000000': color === 'primary',
        '#afadb5': color === 'secondary',
        '#b5460f': color === 'accent',
      })}
      strokeWidth="2"
      {...props}
    />
  );
};

export default memo(CheckIcon);
