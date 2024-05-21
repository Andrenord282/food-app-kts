import cn from 'classnames';
import { FC, memo } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import style from './ShoppingItemSkeleton.module.scss';

type ShoppingItemSkeletonProps = {
  className?: string;
};

const ShoppingItemSkeleton: FC<ShoppingItemSkeletonProps> = ({ className }) => {
  return (
    <SkeletonTheme baseColor="#b5460f54" highlightColor="#b5460f80">
      <div className={cn(className, style.block)}>
        <div className={style.head}>
          <Skeleton height={50} width={'100%'} />
        </div>
        <div className={style.body}>
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
          <Skeleton className={style['body-item']} height={20} width={'100%'} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default memo(ShoppingItemSkeleton);
