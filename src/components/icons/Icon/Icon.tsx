import { FC, SVGAttributes, PropsWithChildren, memo } from 'react';

export type IconColor = 'primary' | 'secondary' | 'accent';

export type IconProps = SVGAttributes<SVGElement> & {
  className?: string;
  color?: IconColor;
  width?: number;
  height?: number;
};

const Icon: FC<PropsWithChildren<IconProps>> = ({ className, width = 24, height = 24, children, ...props }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default memo(Icon);
