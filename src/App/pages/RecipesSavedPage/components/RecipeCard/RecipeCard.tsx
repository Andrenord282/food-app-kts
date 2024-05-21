import cn from 'classnames';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, generatePath } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { DelayButton, Text, WatchIcon } from 'components';
import { ROUTS } from 'config/routs';
import { rootStore } from 'store/index';
import { RecipeClient } from 'store/models/recipe';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './RecipeCard.module.scss';

export type RecipeCardProps = {
  className?: string;
  recipe: RecipeClient;
  saved: boolean;
  recipeViewedList: number[];
  handlerAddViewedRecipe: (id: number) => void;
};

const RecipeCard: FC<RecipeCardProps> = ({ className, recipe, recipeViewedList, handlerAddViewedRecipe }) => {
  const { id, image, title, readyInMinutes, nutrition } = recipe;
  const [startLoading, setStartLoading] = useState<boolean>(false);
  const [startAction, setStartAction] = useState<boolean>(false);
  const composition = nutrition.ingredients.map(({ name }) => name).join(' + ');
  const nutritional = `${nutrition.nutrients[0].amount.toFixed()} ${nutrition.nutrients[0].unit}`;
  const recipeViewedListSet = useMemo(() => new Set(recipeViewedList), [recipeViewedList]);

  const navigate = useNavigate();

  const handleOpenDetails = useCallback(() => {
    navigate(generatePath(ROUTS.RECIPE, { id }));
  }, [id, navigate]);

  const handleRemoveRecipeFromSavedList = useCallback(async () => {
    setStartLoading(true);
    const response = await rootStore.user.removeRecipeFromSavedList(recipe);
    setStartAction((prevAction) => !prevAction);
    setStartLoading(false);
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
  }, [recipe]);

  const handlerDelayAction = useCallback(() => {
    setStartAction((prevAction) => !prevAction);
  }, []);

  return (
    <div className={cn(className, style.card)} onClick={handleOpenDetails}>
      <div className={style.head}>
        <LazyLoadImage
          effect="blur"
          threshold={300}
          visibleByDefault={recipeViewedListSet.has(id)}
          onLoad={() => handlerAddViewedRecipe(id)}
          width={'100%'}
          src={image}
          className={style['img-item']}
        />
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
        <DelayButton
          className={style.buttom}
          loading={startLoading}
          loadingText="Deletion"
          delayActive={startAction}
          delay={1500}
          delayText="Cancel"
          onClick={(e) => {
            e.stopPropagation();
            handlerDelayAction();
          }}
          handlerDelay={handleRemoveRecipeFromSavedList}
        >
          Remove
        </DelayButton>
      </div>
    </div>
  );
};

export default memo(RecipeCard);
