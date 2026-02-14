import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routes';
import '@/styles/index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
