import 'regenerator-runtime';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App/App';
import 'config/configureMobX';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
