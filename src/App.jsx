import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import FeedPage from './pages/FeedPage';
import JobsPage from './pages/JobsPage';
import NetworkPage from './pages/NetworkPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import './pages/FeedPage.css';
import './pages/JobsPage.css';
import './pages/NetworkPage.css';
import './pages/MessagesPage.css';
import './pages/ProfilePage.css';

function AppShell({ onSwitchRole }) {
  const { mode, activeTab } = useApp();

  const pageMap = {
    feed:     <FeedPage />,
    jobs:     <JobsPage />,
    network:  <NetworkPage />,
    messages: <MessagesPage />,
    profile:  <ProfilePage />,
  };

  return (
    <div className={`mode-${mode}`}>
      <Navbar onSwitchRole={onSwitchRole} />
      <div key={activeTab} style={{ animation: 'fadeInUp 0.3s ease' }}>
        {pageMap[activeTab] || <FeedPage />}
      </div>
    </div>
  );
}

export default AppShell;
