import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BaseLayout } from './layouts';
import { RecipesPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<RecipesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
