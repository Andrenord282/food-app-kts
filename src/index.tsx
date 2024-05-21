import 'regenerator-runtime';
import * as ReactDOM from 'react-dom/client';
import App from './App/App';
import 'config/configureMobX';
import 'services/firebase/config';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
