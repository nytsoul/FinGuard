import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Forecast from './pages/Forecast';
import DecisionEngine from './pages/DecisionEngine';
import ActionComposer from './pages/ActionComposer';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="decision-engine" element={<DecisionEngine />} />
          <Route path="actions" element={<ActionComposer />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
