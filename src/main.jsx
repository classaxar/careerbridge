import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './RoleSelect.css';
import './recruiter/RecruiterPortal.css';
import './recruiter/recruiter.css';
import App from './App.jsx';
import RoleSelect from './RoleSelect.jsx';
import RecruiterPortal from './recruiter/RecruiterPortal.jsx';
import { AppProvider } from './context/AppContext.jsx';

function Root() {
  const [role, setRole] = useState('seeker');

  if (!role) return <RoleSelect onSelect={setRole} />;

  if (role === 'recruiter') {
    return <RecruiterPortal onSwitchRole={() => setRole(null)} />;
  }

  return (
    <AppProvider>
      <App onSwitchRole={() => setRole(null)} />
    </AppProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
