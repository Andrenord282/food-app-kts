import cn from 'classnames';
import { FC, PropsWithChildren, memo } from 'react';
import { Icon } from 'components';
import Text from 'components/Text';
import LoaderIcon from 'components/icons/LoaderIcon';
import style from './Loader.module.scss';

type LoaderColor = 'primary' | 'secondary' | 'accent';
type LoaderSize = 's' | 'm' | 'l';

export type LoaderProps = PropsWithChildren<{
  className?: string;
  color?: LoaderColor;
  iconSize?: LoaderSize;
}>;

const Loader: FC<LoaderProps> = ({ className, children, iconSize = 'l', color = 'accent' }) => {
  return (
    <div className={cn(className, style.loader)}>
      <Icon width={24} height={24} viewBox="0 0 16 16" className={cn('loader-icon', style[`icon--${iconSize}`])}>
        <LoaderIcon color={color} />
      </Icon>
      {children && children}
      {!children && <Text>Loading</Text>}
    </div>
  );
};

export default memo(Loader);
