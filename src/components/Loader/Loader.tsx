import cn from 'classnames';
import { FC, PropsWithChildren, memo } from 'react';
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
      <LoaderIcon color={color} className={style[`icon--${iconSize}`]} />
      {children && children}
      {!children && <Text>Loading</Text>}
    </div>
  );
};

export default memo(Loader);
