import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const SearchIcon: FC<IconProps> = ({ color, ...props }) => {
  return (
    <path
      d="M16 14H15.21L14.93 13.73C15.91 12.59 16.5 11.11 16.5 9.5C16.5 5.91 13.59 3 10 3C6.41 3 3.5 5.91 3.5 9.5C3.5 13.09 6.41 16 10 16C11.61 16 13.09 15.41 14.23 14.43L14.5 14.71V15.5L19.5 20.49L20.99 19L16 14ZM10 14C7.51 14 5.5 11.99 5.5 9.5C5.5 7.01 7.51 5 10 5C12.49 5 14.5 7.01 14.5 9.5C14.5 11.99 12.49 14 10 14Z"
      fill={cn({
        currentColor: !color,
        '#000000': color === 'primary',
        '#ffffff': color === 'secondary',
        '#b5460f': color === 'accent',
      })}
      {...props}
    />
  );
};

export default memo(SearchIcon);
