import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Loader, ArrowLeftIcon, IconButton } from 'components';
import { useRecipeStoreContext } from 'context';
import { rootStore } from 'store';
import Description from './components/Description';
import Directions from './components/Directions';
import Equipment from './components/Equipment';
import Ingredients from './components/Ingredients';
import Summary from './components/Summary';
import Wrapper from './components/Wrapper';
import style from './RecipeDetailsPage.module.scss';

const RecipeDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isInitial, isLoading, isError, isSuccess, recipe, error, getRecipe } = useRecipeStoreContext();
  const recipeIdShoppingList = rootStore.user.recipeIdShoppingList;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isInitial && id) {
      getRecipe(id);
    }
  }, [isInitial, id, getRecipe]);

  const handleToBackPage = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <div className={style.information}>
          <Loader iconSize="l" className={style.loader} />
        </div>
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <div className={style.information}>
          <Text tag="h2" view="title-l" weight="700" align="center">
            {error?.code}: <br /> {error?.message}
          </Text>
        </div>
      </Wrapper>
    );
  }

  if (isSuccess && recipe !== null) {
    return (
      <Wrapper>
        <div className={style.head}>
          <IconButton onClick={handleToBackPage} className={style.button}>
            <ArrowLeftIcon width={32} height={32} color="accent" />
          </IconButton>
          <Text className={style.title} tag="h2" weight="700" view="title-xl">
            {recipe.title}
          </Text>
        </div>
        <Summary
          className={style.summary}
          image={recipe.image}
          alt={recipe.title}
          preparation={recipe.preparationMinutes}
          ratings={recipe.aggregateLikes}
          cooking={recipe.cookingMinutes}
        />
        <Description className={style.description} text={recipe.summary} />
        <div className={style.lists}>
          <Ingredients
            saved={recipeIdShoppingList.has(Number(id))}
            id={recipe.id}
            title={recipe.title}
            servings={recipe.servings}
            ingredients={recipe.extendedIngredients}
            className={style['list-item']}
          />
          <Equipment equipments={recipe.equipments} className={style['list-item']} />
        </div>
        <Directions stepList={recipe.analyzedInstructions[0].steps} />
      </Wrapper>
    );
  }
};

export default observer(RecipeDetailsPage);
