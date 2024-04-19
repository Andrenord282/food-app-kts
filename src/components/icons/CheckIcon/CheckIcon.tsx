import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const CheckIcon: FC<IconProps> = ({ className = '', color, width = 24, height = 24, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 11.6129L9.87755 18L20 7"
        stroke={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#afadb5': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        strokeWidth="2"
      />
    </svg>
  );
};

export default memo(CheckIcon);
