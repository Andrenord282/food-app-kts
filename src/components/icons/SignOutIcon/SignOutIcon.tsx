import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const SignOutIcon: FC<IconProps> = ({ color }) => {
  return (
    <path
      d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
      fill="none"
      stroke={cn({
        currentColor: !color,
        '#000000': color === 'primary',
        '#ffffff': color === 'secondary',
        '#b5460f': color === 'accent',
      })}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  );
};

export default memo(SignOutIcon);
