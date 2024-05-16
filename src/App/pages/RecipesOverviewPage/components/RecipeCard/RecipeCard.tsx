import cn from 'classnames';
import { FC, memo, useCallback, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { BaseButton, IconButton, Text, WatchIcon, Icon, HeartIcon } from 'components';
import { ROUTS } from 'config/routs';
import { rootStore } from 'store/index';
import { RecipeClient } from 'store/models/recipe';
import style from './RecipeCard.module.scss';

export type RecipeCardProps = {
  className?: string;
  recipe: RecipeClient;
  saved: boolean;
};

const RecipeCard: FC<RecipeCardProps> = ({ className, recipe, saved }) => {
  const { id, image, title, readyInMinutes, nutrition } = recipe;
  const [startAction, setStartAction] = useState<boolean>(false);
  const composition = nutrition.ingredients.map(({ name }) => name).join(' + ');
  const nutritional = `${nutrition.nutrients[0].amount.toFixed()} ${nutrition.nutrients[0].unit}`;
  const navigate = useNavigate();

  const handleOpenDetails = useCallback(() => {
    navigate(generatePath(ROUTS.RECIPE, { id }));
  }, [id, navigate]);

  const handleAddRecipeToSavedList = useCallback(async () => {
    setStartAction(true);
    await rootStore.user.addRecipeToSavedList(recipe);
    setStartAction(false);
  }, [recipe]);

  const handleRemoveRecipeToSavedList = useCallback(async () => {
    setStartAction(true);
    await rootStore.user.removeRecipeToSavedList(recipe);
    setStartAction(false);
  }, [recipe]);

  return (
    <div className={cn(className, style.card)} onClick={handleOpenDetails}>
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
        {saved && (
          <IconButton
            loading={startAction}
            variant="accent"
            height={30}
            width={30}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveRecipeToSavedList();
            }}
          >
            <Icon viewBox="0 0 512.001 512.001" height={30} width={30}>
              <HeartIcon />
            </Icon>
          </IconButton>
        )}
        {!saved && (
          <BaseButton
            loading={startAction}
            onClick={(e) => {
              e.stopPropagation();
              handleAddRecipeToSavedList();
            }}
          >
            Save
          </BaseButton>
        )}
      </div>
    </div>
  );
};

export default memo(RecipeCard);
