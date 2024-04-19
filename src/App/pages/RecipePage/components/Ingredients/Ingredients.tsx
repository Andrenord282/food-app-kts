import cn from 'classnames';
import { FC } from 'react';
import Text from 'components/Text';
import IngredientIcon from 'components/icons/IngredientIcon';
import { ExtendedIngredient } from 'services/spoonacularApi';
import style from './Ingredients.module.scss';

type IngredientsProps = {
  className?: string;
  ingredients: ExtendedIngredient[];
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

export default Ingredients;
