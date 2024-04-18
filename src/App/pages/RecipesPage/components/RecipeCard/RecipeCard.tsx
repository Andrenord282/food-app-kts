import classNames from 'classnames';
import { FC, ReactNode, MouseEventHandler } from 'react';
import Text from 'components/Text';
import WatchIcon from 'components/icons/WatchIcon';
import style from './RecipeCard.module.scss';

export type RecipeCardProps = {
  className?: string;
  image: string;
  cookingTime?: ReactNode;
  title: ReactNode;
  composition: ReactNode;
  nutritional: ReactNode;
  handleClickCard?: MouseEventHandler;
  button?: ReactNode;
};

const RecipeCard: FC<RecipeCardProps> = ({
  className = '',
  image,
  cookingTime,
  title,
  composition,
  nutritional,
  handleClickCard,
  button,
}) => {
  return (
    <div className={classNames(className, style.card)} onClick={handleClickCard}>
      <div className={style.head}>
        <img src={image} alt="img" className={style['img-item']} />
      </div>
      <div className={style.body}>
        {cookingTime && (
          <Text className={style['cooking-time']} tag="span" view="p-xxs" color="secondary" weight="500">
            <WatchIcon width={12} height={12} color="accent" /> {cookingTime}
          </Text>
        )}
        <Text className={style.title} tag="p" view="p-l" maxLines={2} weight="500">
          {title}
        </Text>
        <Text tag="p" view="p-xs" color="secondary" maxLines={3}>
          {composition}
        </Text>
      </div>
      <div className={style.footer}>
        {nutritional && (
          <Text tag="p" view="p-m" weight="700" color="accent">
            {nutritional}
          </Text>
        )}
        {button}
      </div>
    </div>
  );
};

export default RecipeCard;
