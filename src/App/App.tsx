import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTS } from 'config/routs';
import { RecipesOverviewListProvider, RecipeStoreProvider, RecipeSavedListProvider } from 'context';
import BaseLayout from './layouts/BaseLayout';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import RecipesSavedPage from './pages/RecipesSavedPage';
import style from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Routes>
          <Route path={ROUTS.INDEX} element={<BaseLayout />}>
            <Route
              index
              element={
                <RecipesOverviewListProvider>
                  <RecipesPage />
                </RecipesOverviewListProvider>
              }
            />
            <Route
              path={ROUTS.RECIPE}
              element={
                <RecipeStoreProvider>
                  <RecipePage />
                </RecipeStoreProvider>
              }
            />
            <Route
              path={ROUTS.RECIPES_SAVED}
              element={
                <RecipeSavedListProvider>
                  <RecipesSavedPage />
                </RecipeSavedListProvider>
              }
            />
            <Route path={ROUTS.AUTH} element={<AuthPage />} />
            <Route path={ROUTS.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
