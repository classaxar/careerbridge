import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import FeedPage from './pages/FeedPage';
import JobsPage from './pages/JobsPage';
import NetworkPage from './pages/NetworkPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import './pages/FeedPage.css';
import './pages/JobsPage.css';
import './pages/NetworkPage.css';
import './pages/MessagesPage.css';
import './pages/ProfilePage.css';

function AppShell() {
  const { mode, activeTab } = useApp();

  if (activeTab === 'landing') {
    return <LandingPage />;
  }

  if (activeTab === 'auth') {
    return <AuthPage />;
  }

  const pageMap = {
    feed:     <FeedPage />,
    jobs:     <JobsPage />,
    network:  <NetworkPage />,
    messages: <MessagesPage />,
    profile:  <ProfilePage />,
  };

  return (
    <div className={`mode-${mode}`}>
      <Navbar />
      <div key={activeTab} style={{ animation: 'fadeInUp 0.3s ease' }}>
        {pageMap[activeTab] || <FeedPage />}
      </div>
    </div>
  );
}

export default AppShell;
