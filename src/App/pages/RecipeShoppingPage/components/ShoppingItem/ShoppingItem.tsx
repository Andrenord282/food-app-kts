import cn from 'classnames';
import { FC, memo, useCallback, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { CheckBox, DelayButton, Text } from 'components';
import { ROUTS } from 'config/routs';
import { rootStore } from 'store/index';
import { RecipeIngredientListClient } from 'store/models/recipe';
import style from './ShoppingItem.module.scss';

type ShoppingItemProps = {
  className?: string;
  recipe: RecipeIngredientListClient;
  handleUpdateList: (newItem: RecipeIngredientListClient) => void;
};

const ShoppingItem: FC<ShoppingItemProps> = ({ className, recipe, handleUpdateList }) => {
  const [startRemoveLoading, setStartRemoveLoading] = useState<boolean>(false);
  const [startRemove, setStartRemove] = useState<boolean>(false);
  const [originalCompleting, setOriginalCompleting] = useState<string>('');
  const [starCompleteLoading, setStarCompleteLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDetails = useCallback(() => {
    navigate(generatePath(ROUTS.RECIPE, { id: recipe.id }));
  }, [recipe, navigate]);

  const handleRemoveRecipeFromShoppongList = useCallback(async () => {
    setStartRemoveLoading(true);
    const response = await rootStore.user.removeRecipeFromShoppingList(recipe);
    setStartRemove((prevAction) => !prevAction);
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
  }, [recipe]);

  const handleItemComplete = useCallback(
    async (ingredient: { original: string; completed: boolean }) => {
      setOriginalCompleting(ingredient.original);
      setStarCompleteLoading(true);
      const udpatedIngrediens: RecipeIngredientListClient = {
        ...recipe,
        ingredients: recipe.ingredients.map(({ original, completed }) => {
          if (ingredient.original === original) {
            return {
              original,
              completed: !completed,
            };
          } else {
            return { original, completed };
          }
        }),
      };
      await rootStore.user.addRecipeToShoppingList(udpatedIngrediens);
      handleUpdateList(udpatedIngrediens);
      setStarCompleteLoading(false);
      setOriginalCompleting('');
    },
    [recipe, handleUpdateList],
  );

  const handlerDelayAction = useCallback(() => {
    setStartRemove((prevAction) => !prevAction);
  }, []);

  return (
    <div className={cn(className, style.block)}>
      <div className={style.head}>
        <button className={style.link} onClick={handleOpenDetails}>
          <Text tag="span">{recipe.title}</Text>
        </button>
        <DelayButton
          delay={4000}
          className={style.remove}
          delayText="Cancel"
          loading={startRemoveLoading}
          delayActive={startRemove}
          handlerDelay={handleRemoveRecipeFromShoppongList}
          onClick={(e) => {
            e.stopPropagation();
            handlerDelayAction();
          }}
        >
          Remove
        </DelayButton>
      </div>
      <div className={style.list}>
        {recipe.ingredients.map((item) => {
          return (
            <div key={item.original} className={style.item}>
              <CheckBox
                className={cn({ [style['check--disabled']]: starCompleteLoading })}
                disabled={starCompleteLoading}
                loading={starCompleteLoading && originalCompleting === item.original}
                checked={item.completed}
                onChange={() => {
                  handleItemComplete(item);
                }}
              />
              <Text className={cn({ [style.completed]: item.completed })}>{item.original}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ShoppingItem);
