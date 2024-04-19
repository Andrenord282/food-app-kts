import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTS } from 'config/routs';
import BaseLayout from './layouts/BaseLayout';
import NotFoundPage from './pages/NotFoundPage';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import style from './App.module.scss';

const App = () => {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTS.INDEX} element={<BaseLayout />}>
            <Route index element={<RecipesPage />} />
            <Route path={ROUTS.RECIPE} element={<RecipePage />} />
            <Route path={ROUTS.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
