import { useParams, Link } from 'react-router-dom';
import { FC, useEffect } from 'react';
import useFetchRecipe from './hooks/useFetchRecipe';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import Text from 'components/Text';
import Summary from './components/Summary';
import Description from './components/Description';
import Directions from './components/Directions';
import Ingredients from './components/Ingredients';
import Equipment from './components/Equipment';
import style from './RecipePage.module.scss';

const ResipePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { recipe, fetchRecipe } = useFetchRecipe();

  useEffect(() => {
    if (id) {
      fetchRecipe(id);
    }
  }, [id]);

  if (recipe) {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.head}>
            <Link to={'/'}>
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
            cooking={recipe.readyInMinutes}
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
