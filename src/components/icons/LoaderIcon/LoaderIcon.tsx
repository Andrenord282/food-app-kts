import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const LoaderIcon: FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.34967 13.8462C6.12089 14.5916 2.89917 12.5785 2.15374 9.3497C1.40832 6.12092 3.42148 2.89919 6.65026 2.15377C9.87904 1.40835 13.1008 3.42151 13.8462 6.65028L15.7949 6.20038C14.801 1.89534 10.5054 -0.788866 6.20036 0.20503C1.89532 1.19893 -0.788892 5.49456 0.205004 9.7996C1.1989 14.1046 5.49454 16.7888 9.79957 15.795L9.34967 13.8462Z"
        fill={cn({
          currentColor: !color,
          '#000000': color === 'primary',
          '#ffffff': color === 'secondary',
          '#b5460f': color === 'accent',
        })}
      />
    </svg>
  );
};

export default memo(LoaderIcon);
