// import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App/App.tsx';
import 'config/configureMobX.ts';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
);
