import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { OutputWindow } from '@/components/output/OutputWindow';
import { OperatorPanel } from '@/components/operator/OperatorPanel';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/output" element={<OutputWindow />} />
        <Route path="/operator" element={<OperatorPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
