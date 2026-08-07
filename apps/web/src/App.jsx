import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/employer" element={<EmployerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
