import cn from 'classnames';
import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import style from './SkeletonCard.module.scss';

type SkeletonCardProps = {
  className?: string;
};

const SkeletonCard: FC<SkeletonCardProps> = ({ className }) => {
  return (
    <SkeletonTheme baseColor="#b5460f54" highlightColor="#b5460f80">
      <div className={cn(className, style.card)}>
        <div className={style.head}>
          <Skeleton height={360} width={'100%'} />
        </div>
        <div className={style.body}>
          <Skeleton className={style['body-item']} height={18} width={'100%'} />
          <Skeleton className={style['body-item']} height={24} width={'100%'} />
          <Skeleton className={style['body-item']} height={40} width={'100%'} />
        </div>
        <div className={style.footer}>
          <Skeleton height={22} width={70} />
          <Skeleton height={52} width={80} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCard;
