import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from 'components';
import { ROUTS } from 'config/routs';
import { RecipesOverviewListProvider, RecipeStoreProvider, RecipeSavedListProvider } from 'context';
import { rootStore } from 'store';
import BaseLayout from './layouts/BaseLayout';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipePage from './pages/RecipePage';
import RecipesOverviewPage from './pages/RecipesOverviewPage';
import RecipesSavedPage from './pages/RecipesSavedPage';
import style from './App.module.scss';
import PrivateRoute from 'components/PrivateRoute';

const App = () => {
  useEffect(() => {
    rootStore.user.eventListeningUserAuthorization();
  }, []);

  return (
    <BrowserRouter>
      <div className={style.app}>
        {rootStore.user.userInitial ? (
          <Loader className={style.loader} />
        ) : (
          <>
            <Routes>
              <Route path={ROUTS.INDEX} element={<BaseLayout />}>
                <Route
                  index
                  element={
                    <RecipesOverviewListProvider>
                      <RecipesOverviewPage />
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
                <Route element={<PrivateRoute userIdentified={rootStore.user.userIdentified} />}>
                  <Route
                    path={ROUTS.RECIPES_SAVED}
                    element={
                      <RecipeSavedListProvider>
                        <RecipesSavedPage />
                      </RecipeSavedListProvider>
                    }
                  />
                </Route>
                <Route path={ROUTS.AUTH} element={<AuthPage />} />
                <Route path={ROUTS.NOT_FOUND} element={<NotFoundPage />} />
              </Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default observer(App);
