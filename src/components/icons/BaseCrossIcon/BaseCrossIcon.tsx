import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const BaseCrossIcon: FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 512 512"
      {...props}
    >
      <g>
        <g data-name="02 User">
          <path
            d="M25 512a25 25 0 0 1-17.68-42.68l462-462a25 25 0 0 1 35.36 35.36l-462 462A24.93 24.93 0 0 1 25 512z"
            fill={cn({
              currentColor: !color,
              '#000000': color === 'primary',
              '#afadb5': color === 'secondary',
              '#b5460f': color === 'accent',
            })}
            opacity="1"
          ></path>
          <path
            d="M487 512a24.93 24.93 0 0 1-17.68-7.32l-462-462A25 25 0 0 1 42.68 7.32l462 462A25 25 0 0 1 487 512z"
            fill={cn({
              currentColor: !color,
              '#000000': color === 'primary',
              '#afadb5': color === 'secondary',
              '#b5460f': color === 'accent',
            })}
            opacity="1"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default memo(BaseCrossIcon);
