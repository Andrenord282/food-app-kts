import classNames from 'classnames';
import { FC } from 'react';
import SummaryItem from '../SummaryItem';
import style from './Summary.module.scss';

type SummaryProps = {
  className?: string;
  alt: string;
  image: string;
  preparation: number;
  ratings: number;
  cooking: number;
  servings: number;
};

const Summary: FC<SummaryProps> = ({ className, alt, image, preparation, ratings, cooking, servings }) => {
  return (
    <div className={classNames(className, style.section)}>
      <div className={style.img}>
        <img src={image} alt={alt} />
      </div>
      <div className={style.list}>
        <SummaryItem className={style.item} title="Preparation" text={`${preparation > 0 ? preparation : 0} minutes`} />
        <SummaryItem className={style.item} title="Cooking" text={`${cooking} minutes`} />
        <SummaryItem className={style.item} title="Total" text={`${preparation + cooking} minutes`} />
        <SummaryItem className={style.item} title="Ratings" text={`${ratings} likes`} />
        <SummaryItem className={style.item} title="Servings" text={`${servings} servings`} />
      </div>
    </div>
  );
};

export default Summary;
