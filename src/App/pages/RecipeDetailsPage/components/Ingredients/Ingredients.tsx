import cn from 'classnames';
import { FC, memo, useCallback, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { Text, IngredientIcon, BaseButton, DelayButton } from 'components';
import { rootStore } from 'store';
import { ExtendedIngredientClient } from 'store/models/recipe';
import style from './Ingredients.module.scss';

type IngredientsProps = {
  saved: boolean;
  id: number;
  title: string;
  servings: number;
  className?: string;
  ingredients: ExtendedIngredientClient[];
};

const Ingredients: FC<IngredientsProps> = ({ saved, id, title, className, ingredients, servings }) => {
  const [startAddLoading, setStartAddLoading] = useState<boolean>(false);
  const [startRemoveLoading, setStartRemoveLoading] = useState<boolean>(false);
  const [startAction, setStartAction] = useState<boolean>(false);

  const handleAddRecipeToShoppingList = useCallback(async () => {
    setStartAddLoading(true);
    const response = await rootStore.user.addRecipeToShoppingList({
      id,
      title,
      ingredients: ingredients.map(({ original }) => ({ original, completed: false })),
    });
    setStartAddLoading(false);
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
  }, [id, title, ingredients]);

  const handleRemoveRecipeFromShoppongList = useCallback(async () => {
    setStartRemoveLoading(true);
    const response = await rootStore.user.removeRecipeFromShoppingList({
      id,
      title,
      ingredients: ingredients.map(({ original }) => ({ original, completed: false })),
    });
    setStartAction((prevAction) => !prevAction);
    setStartRemoveLoading(false);
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
  }, [id, title, ingredients]);

  const handlerDelayAction = useCallback(() => {
    setStartAction((prevAction) => !prevAction);
  }, []);

  return (
    <div className={cn(className)}>
      <div className={style.head}>
        <Text view="p-l" weight="600" className={style.title}>
          Ingredients Ingredients for {servings} servings
        </Text>
        {!saved && (
          <BaseButton className={style.buttom} loading={startAddLoading} onClick={handleAddRecipeToShoppingList}>
            Add to shopping
          </BaseButton>
        )}
        {saved && (
          <DelayButton
            className={style.buttom}
            loading={startRemoveLoading}
            delayActive={startAction}
            handlerDelay={handleRemoveRecipeFromShoppongList}
            onClick={(e) => {
              e.stopPropagation();
              handlerDelayAction();
            }}
          >
            Remove from shopping list
          </DelayButton>
        )}
      </div>
      <div className={style.body}>
        {ingredients.map(({ original }, index) => {
          return (
            <div key={index} className={style.item}>
              <IngredientIcon width={24} height={24} color="accent" />
              <Text view="p-xs">{original}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Ingredients);
