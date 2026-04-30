import React from 'react';
import { createRoot } from 'react-dom/client';
import RecruiterPortal from './recruiter/RecruiterPortal.jsx';
import './index.css';
import './recruiter/RecruiterPortal.css';
import './recruiter/recruiter.css';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RecruiterPortal />
    </AppProvider>
  </React.StrictMode>
);
