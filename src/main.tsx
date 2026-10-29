import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { UndoRedoProvider } from './context/UndoRedoContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <UndoRedoProvider>
    <App />
  </UndoRedoProvider>
);

