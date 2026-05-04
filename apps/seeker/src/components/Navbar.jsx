import { useState } from 'react';
import {
  Home, Briefcase, Users, MessageSquare, Bell,
  Search, Layers, ChevronDown, GraduationCap,
  UserCheck, X, Menu,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { currentUser, notifications as notifData } from '../data/mockData';
import { UserButton } from '@clerk/clerk-react';
import './Navbar.css';

const tabs = [
  { id:'feed',    label:'Home',     icon:Home },
  { id:'jobs',    label:'Jobs',     icon:Briefcase },
  { id:'network', label:'Network',  icon:Users },
  { id:'messages',label:'Messages', icon:MessageSquare },
  { id:'profile', label:'Profile',  icon:UserCheck },
];

const modes = [
  { id:'normal',     label:'Professional', icon:Briefcase,     badge:'Pro',   badgeCls:'badge-blue' },
  { id:'internship', label:'Internship',   icon:GraduationCap, badge:'Intern',badgeCls:'badge-green' },
  { id:'senior',     label:'Senior+',      icon:UserCheck,     badge:'55+',   badgeCls:'badge-purple' },
];

export default function Navbar({ onSwitchRole }) {
  const { mode, setMode, activeTab, setActiveTab, notifications } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const currentMode = modes.find(m => m.id === mode);

  return (
    <nav className="navbar">
      {/* ── LEFT: Logo ── */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <Layers size={22} className="logo-icon" />
          <span className="logo-text">Career<span className="logo-net">Bridge</span></span>
        </div>
      </div>

      {/* ── CENTRE: Search ── */}
      <div className="navbar-search">
        <Search size={15} className="search-icon" />
        <input className="search-input" placeholder="Search jobs, people, companies…" />
      </div>

      {/* ── TABS (desktop) ── */}
      <div className="navbar-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`nav-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
            title={t.label}
          >
            <t.icon size={20} />
            <span>{t.label}</span>
          </button>
        ))}

        {/* Notifications */}
        <div className="notif-wrapper">
          <button className="nav-tab notif-btn" onClick={() => setShowNotif(v => !v)}>
            <Bell size={20} />
            {notifications > 0 && <span className="notif-badge">{notifications}</span>}
            <span>Alerts</span>
          </button>
          {showNotif && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                <button onClick={() => setShowNotif(false)}><X size={14}/></button>
              </div>
              {notifData.map(n => (
                <div key={n.id} className="notif-item">
                  <span className={`notif-dot ${n.type}`}></span>
                  <div>
                    <p className="notif-text">{n.text}</p>
                    <p className="text-xs text-muted">{n.time} ago</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Mode switcher + Avatar ── */}
      <div className="navbar-right">
        {/* Mode switcher */}
        <div className="mode-switcher">
          <button className="mode-btn" onClick={() => setShowModeMenu(v => !v)}>
            <span className={`badge ${currentMode.badgeCls}`}>{currentMode.badge}</span>
            <ChevronDown size={14} />
          </button>
          {showModeMenu && (
            <div className="mode-dropdown">
              <p className="mode-dropdown-title">Switch Mode</p>
              {modes.map(m => (
                <button
                  key={m.id}
                  className={`mode-option ${mode === m.id ? 'selected' : ''}`}
                  onClick={() => { setMode(m.id); setShowModeMenu(false); }}
                >
                  <m.icon size={15} />
                  <span>{m.label}</span>
                  <span className={`badge ${m.badgeCls}`}>{m.badge}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Switch Role Removed */}

        {/* Clerk User Avatar & Dropdown */}
        <UserButton />

        {/* Mobile menu button removed */}
      </div>

      {/* ── MOBILE NAV (Bottom Bar) ── */}
      <div className="mobile-nav">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`mobile-nav-item ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            <t.icon size={20} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
