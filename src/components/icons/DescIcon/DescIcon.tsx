import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const DescIcon: FC<IconProps> = ({ color }) => {
  return (
    <>
      <path
        fill={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#ffffff': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        d="M5 12v-12h-2v12h-2.5l3.5 3.5 3.5-3.5h-2.5z"
      ></path>
      <path
        fill={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#ffffff': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        d="M7 0h9v2h-9v-2z"
      ></path>
      <path
        fill={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#ffffff': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        d="M7 3h7v2h-7v-2z"
      ></path>
      <path
        fill={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#ffffff': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        d="M7 6h5v2h-5v-2z"
      ></path>
      <path
        fill={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#ffffff': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
        d="M7 9h3v2h-3v-2z"
      ></path>
    </>
  );
};

export default memo(DescIcon);
