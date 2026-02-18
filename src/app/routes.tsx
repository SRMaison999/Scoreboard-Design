import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { OutputWindow } from '@/components/output/OutputWindow';
import { OperatorPanel } from '@/components/operator/OperatorPanel';

const isElectron = typeof window !== 'undefined'
  && 'electronAPI' in window;

const Router = isElectron ? HashRouter : BrowserRouter;

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/output" element={<OutputWindow />} />
        <Route path="/operator" element={<OperatorPanel />} />
      </Routes>
    </Router>
  );
}
