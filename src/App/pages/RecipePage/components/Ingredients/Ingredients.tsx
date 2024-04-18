import classNames from 'classnames';
import { ExtendedIngredient } from 'services/spoonacularApi';
import { FC } from 'react';
import IngredientIcon from 'components/icons/IngredientIcon';
import Text from 'components/Text';
import style from './Ingredients.module.scss';

type IngredientsProps = {
  className?: string;
  ingredients: ExtendedIngredient[];
};

const Ingredients: FC<IngredientsProps> = ({ className, ingredients }) => {
  return (
    <div className={classNames(className, style.list)}>
      <Text view="p-l" weight="600" className={style.title}>
        Ingredients
      </Text>
      {ingredients.map(({ id, originalName }, index) => {
        // id + index key выглядит тупо, но там есть id с повторами, я подумаю
        return (
          <div key={id + index} className={style.item}>
            <IngredientIcon width={24} height={24} color="accent" />
            <Text view="p-xs">{originalName}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default Ingredients;
