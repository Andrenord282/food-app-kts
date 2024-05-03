import cn from 'classnames';
import { FC, memo, useCallback } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { BaseButton, Text, WatchIcon } from 'components';
import { ROUTS } from 'config/routs';
import { RecipeModel } from 'store/models/recipes/modelsClient';
import * as style from './RecipeCard.module.scss';

export type RecipeCardProps = {
  className?: string;
  recipe: RecipeModel;
};

const RecipeCard: FC<RecipeCardProps> = ({ className, recipe }) => {
  const { id, image, title, readyInMinutes, nutrition } = recipe;
  const composition = nutrition.ingredients.map(({ name }) => name).join(' + ');
  const nutritional = `${nutrition.nutrients[0].amount.toFixed()} ${nutrition.nutrients[0].unit}`;
  const navigate = useNavigate();

  const handleClickCard = useCallback(() => {
    navigate(generatePath(ROUTS.RECIPE, { id }));
  }, [id, navigate]);

  return (
    <div className={cn(className, style.card)} onClick={handleClickCard}>
      <div className={style.head}>
        <img src={image} alt="img" className={style['img-item']} />
      </div>
      <div className={style.body}>
        <Text className={style['cooking-time']} tag="span" view="p-xxs" color="secondary" weight="500">
          <WatchIcon width={12} height={12} color="accent" /> {`${readyInMinutes} minutes`}
        </Text>
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
        <BaseButton>Save</BaseButton>
      </div>
    </div>
  );
};

export default memo(RecipeCard);
