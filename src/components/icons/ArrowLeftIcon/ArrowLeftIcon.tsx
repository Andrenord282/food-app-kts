import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const ArrowLeftIcon: FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {
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
        d="M20.12 5.44006L11.4267 14.1334C10.4 15.1601 10.4 16.8401 11.4267 17.8667L20.12 26.5601"
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

export default memo(ArrowLeftIcon);
