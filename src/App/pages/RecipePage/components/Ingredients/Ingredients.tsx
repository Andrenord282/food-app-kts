import cn from 'classnames';
import { FC, memo } from 'react';
import { Text, IngredientIcon } from 'components';
import { ExtendedIngredientModel } from 'store/models/recipes/modelsClient';
import style from './Ingredients.module.scss';

type IngredientsProps = {
  className?: string;
  ingredients: ExtendedIngredientModel[];
};

const Ingredients: FC<IngredientsProps> = ({ className, ingredients }) => {
  return (
    <div className={cn(className, style.list)}>
      <Text view="p-l" weight="600" className={style.title}>
        Ingredients
      </Text>
      {ingredients.map(({ originalName }, index) => {
        return (
          <div key={index} className={style.item}>
            <IngredientIcon width={24} height={24} color="accent" />
            <Text view="p-xs">{originalName}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Ingredients);
