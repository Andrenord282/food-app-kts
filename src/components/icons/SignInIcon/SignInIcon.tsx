import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const SignInIcon: FC<IconProps> = ({ color }) => {
  return (
    <>
      <path
        d="M192 176v-40a40 40 0 0140-40h160a40 40 0 0140 40v240a40 40 0 01-40 40H240c-22.09 0-48-17.91-48-40v-40"
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
      <path
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
        d="M288 336l80-80-80-80M80 256h272"
      />
    </>
  );
};

export default memo(SignInIcon);
