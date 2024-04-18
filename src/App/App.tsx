import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import style from './App.module.scss';

const App = () => {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<RecipesPage />} />
            <Route path="recipe/:id" element={<RecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
