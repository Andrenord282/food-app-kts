import { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import { ROUTS } from 'config/routs';
import Description from './components/Description';
import Directions from './components/Directions';
import Equipment from './components/Equipment';
import Ingredients from './components/Ingredients';
import Summary from './components/Summary';
import useFetchRecipe from './hooks/useFetchRecipe';
import style from './RecipePage.module.scss';

const ResipePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { recipe, fetchRecipe } = useFetchRecipe();

  useEffect(() => {
    if (id) {
      fetchRecipe(id);
    }
  }, [id, fetchRecipe]);

  if (recipe === null) {
    return (
      <div className={style.wrapper}>
        <Loader iconSize="l" className={style.loader} />
      </div>
    );
  }

  if (recipe) {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.head}>
            <Link to={ROUTS.INDEX}>
              <ArrowLeftIcon width={32} height={32} color="accent" />
            </Link>
            <Text tag="h2" weight="700" view="title-xl">
              {recipe.title}
            </Text>
          </div>
          <Summary
            className={style.summary}
            alt={recipe.title}
            image={recipe.image}
            preparation={recipe.preparationMinutes}
            ratings={recipe.aggregateLikes}
            cooking={recipe.cookingMinutes}
            servings={recipe.servings}
          />
          <Description className={style.description} text={recipe.summary} />
          <div className={style.lists}>
            <Ingredients ingredients={recipe.extendedIngredients} className={style['list-item']} />
            <Equipment equipments={recipe.analyzedInstructions[0].steps} className={style['list-item']} />
          </div>
          <Directions stepList={recipe.analyzedInstructions[0].steps} />
        </div>
      </div>
    );
  }
};

export default ResipePage;
