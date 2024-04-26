import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const ArrowRightIcon: FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
        stroke={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#afadb5': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(ArrowRightIcon);
