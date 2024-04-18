import { FC } from 'react';
import Text from 'components/Text';
import style from './Summary.module.scss';
import classNames from 'classnames';

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
        <div className={style.item}>
          <Text view="p-xs">Preparation</Text>
          <Text view="p-xs" weight="600" color="accent">
            {preparation} minutes
          </Text>
        </div>
        <div className={style.item}>
          <Text view="p-xs">Cooking</Text>
          <Text view="p-xs" weight="600" color="accent">
            {cooking} minutes
          </Text>
        </div>
        <div className={style.item}>
          <Text view="p-xs">Total</Text>
          <Text view="p-xs" weight="600" color="accent">
            {preparation + cooking} minutes
          </Text>
        </div>
        <div className={style.item}>
          <Text view="p-xs">Ratings</Text>
          <Text view="p-xs" weight="600" color="accent">
            {ratings} likes
          </Text>
        </div>
        <div className={style.item}>
          <Text view="p-xs">Servings</Text>
          <Text view="p-xs" weight="600" color="accent">
            {servings} servings
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Summary;
