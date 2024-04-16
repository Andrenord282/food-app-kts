import { FC, SVGAttributes, PropsWithChildren } from 'react';

export type IconColor = 'primary' | 'secondary' | 'accent';

export type IconProps = SVGAttributes<SVGElement> & {
  className?: string;
  color?: IconColor;
  width?: number;
  height?: number;
};

const Icon: FC<PropsWithChildren<IconProps>> = ({ name }) => {
  return null;
};

export default Icon;
