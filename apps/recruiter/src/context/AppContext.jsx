import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [mode, setMode] = useState('normal'); // 'normal' | 'internship' | 'senior'
  const [activeTab, setActiveTab] = useState('feed');
  const [notifications, setNotifications] = useState(4);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ 
      mode, setMode, 
      activeTab, setActiveTab, 
      notifications, setNotifications,
      isAuthenticated, setIsAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
