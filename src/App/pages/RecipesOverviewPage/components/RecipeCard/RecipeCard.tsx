import cn from 'classnames';
import { FC, memo, useCallback, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, generatePath } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
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
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const composition = nutrition.ingredients.map(({ name }) => name).join(' + ');
  const nutritional = `${nutrition.nutrients[0].amount.toFixed()} ${nutrition.nutrients[0].unit}`;
  const navigate = useNavigate();

  const handleOpenDetails = useCallback(() => {
    navigate(generatePath(ROUTS.RECIPE, { id }));
  }, [id, navigate]);

  const handleAddRecipeToSavedList = useCallback(async () => {
    setAddLoading(true);
    const response = await rootStore.user.addRecipeToSavedList(recipe);
    if (response.state === 'success') {
      toast.info(response.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
    if (response.state === 'error') {
      toast.error(response.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
    setAddLoading(false);
  }, [recipe]);

  const handleRemoveRecipeFromSavedList = useCallback(async () => {
    setRemoveLoading(true);
    const response = await rootStore.user.removeRecipeFromSavedList(recipe);
    if (response.state === 'success') {
      toast.info(response.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
    if (response.state === 'error') {
      toast.error(response.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
    setRemoveLoading(false);
  }, [recipe]);

  return (
    <div className={cn(className, style.card)} onClick={handleOpenDetails}>
      <div className={style.head}>
        <LazyLoadImage src={image} className={style['img-item']} />
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
            loading={removeLoading}
            variant="accent"
            height={30}
            width={30}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveRecipeFromSavedList();
            }}
          >
            <Icon viewBox="0 0 512.001 512.001" height={30} width={30}>
              <HeartIcon />
            </Icon>
          </IconButton>
        )}
        {!saved && (
          <BaseButton
            loading={addLoading}
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
