import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BaseLayout } from './layouts';
import { RecipesPage } from './pages';
import style from './App.module.scss';

const App = () => {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<RecipesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
