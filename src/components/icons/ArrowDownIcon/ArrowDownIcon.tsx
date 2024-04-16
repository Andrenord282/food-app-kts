import classNames from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const ArrowDownIcon: FC<IconProps> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={classNames({
        currentColor: !color,
        '#000000': color === 'primary',
        '#afadb5': color === 'secondary',
        '#518581': color === 'accent',
      })}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill="inherit"
      />
    </svg>
  );
};

export default memo(ArrowDownIcon);
