import { useEffect, useState } from 'react';
import { Layers, LayoutDashboard, PlusCircle, Briefcase, Users,
  TrendingUp, LogOut, Menu, X, BarChart2,
} from 'lucide-react';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJobPage from './pages/PostJobPage';
import ManageJobsPage from './pages/ManageJobsPage';
import ApplicantsPage from './pages/ApplicantsPage';
import './RecruiterPortal.css';

import RecruiterAuth from './RecruiterAuth';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'post-job',   label: 'Post a Job',   icon: PlusCircle },
  { id: 'manage',     label: 'Manage Jobs',  icon: Briefcase },
  { id: 'applicants', label: 'Applicants',   icon: Users },
];

const RECRUITER = { name: 'Rohan Kapoor', company: 'TechHire Solutions', initials: 'RK' };

export default function RecruiterPortal() {
  const { isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);

  if (!isAuthenticated) {
    return <RecruiterAuth />;
  }

  const viewApplicants = (jobId) => {
    setSelectedJobId(jobId);
    setActiveTab('applicants');
  };

  const pageMap = {
    dashboard:  <RecruiterDashboard onNavigate={setActiveTab} />,
    'post-job': <PostJobPage onSuccess={() => setActiveTab('manage')} />,
    manage:     <ManageJobsPage onViewApplicants={viewApplicants} onNewJob={() => setActiveTab('post-job')} />,
    applicants: <ApplicantsPage selectedJobId={selectedJobId} />,
  };

  return (
    <div className={`recruiter-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* ── Sidebar ── */}
      <aside className="recruiter-sidebar">
        <div className="sidebar-logo">
          <Layers size={20} className="logo-icon" />
          {sidebarOpen && <span>Career<span style={{ color:'var(--accent-green)' }}>Bridge</span></span>}
        </div>

        <div className="sidebar-section-label">{sidebarOpen && 'RECRUITER'}</div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
            >
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="recruiter-profile">
            <div className="avatar-placeholder avatar-sm">{RECRUITER.initials}</div>
            {sidebarOpen && (
              <div>
                <p className="fw-600 text-sm">{RECRUITER.name}</p>
                <p className="text-xs text-muted">{RECRUITER.company}</p>
              </div>
            )}
          </div>
          {/* Switch Mode Removed */}
        </div>

        {/* Toggle button */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(v => !v)}
        >
          {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="recruiter-main">
        {/* Top bar */}
        <header className="recruiter-topbar">
          <div>
            <h1 className="topbar-title">
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-muted">
              Recruiter Portal · {RECRUITER.company}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-green">
              <span className="live-dot" style={{ width:'6px', height:'6px' }} /> Live
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActiveTab('post-job')}
            >
              <PlusCircle size={14} /> Post a Job
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="recruiter-page-content" key={activeTab}>
          {pageMap[activeTab]}
        </div>
      </main>
    </div>
  );
}
