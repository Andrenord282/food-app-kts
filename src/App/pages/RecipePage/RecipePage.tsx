import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Text, Loader, ArrowLeftIcon } from 'components';
import { ROUTS } from 'config/routs';
import { RecipeStore } from 'store';
import { Meta, useLocalStore } from 'utils';
import Description from './components/Description';
import Directions from './components/Directions';
import Equipment from './components/Equipment';
import Ingredients from './components/Ingredients';
import Summary from './components/Summary';
import style from './RecipePage.module.scss';

const ResipePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipeStore = useLocalStore(() => new RecipeStore());
  const isInitial = recipeStore.meta === Meta.initial;
  const isLoading = recipeStore.meta === Meta.loading;
  const isSuccess = recipeStore.meta === Meta.success;
  const isError = recipeStore.meta === Meta.error;
  const errorInfo = recipeStore.error;
  const reсipe = recipeStore.recipe;

  useEffect(() => {
    if (isInitial && id) {
      recipeStore.getRecipe(id);
    }
  }, [recipeStore, isInitial, id]);

  if (isLoading) {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.information}>
            <Loader iconSize="l" className={style.loader} />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.information}>
            <Text tag="h2" view="title-l" weight="700" align="center">
              {errorInfo?.code}: <br /> {errorInfo?.message}
            </Text>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess && reсipe !== null) {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.head}>
            <Link to={ROUTS.INDEX}>
              <ArrowLeftIcon width={32} height={32} color="accent" />
            </Link>
            <Text tag="h2" weight="700" view="title-xl">
              {reсipe.title}
            </Text>
          </div>
          <Summary
            className={style.summary}
            image={reсipe.image}
            alt={reсipe.title}
            preparation={reсipe.preparationMinutes}
            ratings={reсipe.aggregateLikes}
            cooking={reсipe.cookingMinutes}
            servings={reсipe.servings}
          />
          <Description className={style.description} text={reсipe.summary} />
          <div className={style.lists}>
            <Ingredients ingredients={reсipe.extendedIngredients} className={style['list-item']} />
            <Equipment equipments={reсipe.equipments} className={style['list-item']} />
          </div>
          <Directions stepList={reсipe.analyzedInstructions[0].steps} />
        </div>
      </div>
    );
  }
};

export default observer(ResipePage);
