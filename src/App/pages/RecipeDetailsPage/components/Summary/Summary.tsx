import cn from 'classnames';
import { FC, memo } from 'react';
import SummaryItem from '../SummaryItem';
import style from './Summary.module.scss';

type SummaryProps = {
  className?: string;
  alt: string;
  image: string;
  preparation: number;
  ratings: number;
  cooking: number;
};

const Summary: FC<SummaryProps> = ({ className, alt, image, preparation, ratings, cooking }) => {
  return (
    <div className={cn(className, style.block)}>
      <div className={style.img}>
        <img src={image} alt={alt} />
      </div>
      <div className={style.list}>
        <SummaryItem className={style.item} title="Preparation" text={`${Math.max(preparation, 0)} minutes`} />
        <SummaryItem className={style.item} title="Cooking" text={`${Math.max(cooking, 0)} minutes`} />
        <SummaryItem className={style.item} title="Total" text={`${Math.max(preparation + cooking, 0)} minutes`} />
        <SummaryItem className={style.item} title="Ratings" text={`${ratings} likes`} />
      </div>
    </div>
  );
};

export default memo(Summary);
