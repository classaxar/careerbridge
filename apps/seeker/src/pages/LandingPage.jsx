import React from 'react';
import { Layers, ArrowRight, GraduationCap, Briefcase, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './LandingPage.css';

export default function LandingPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="landing-container">
      {/* Background Animations */}
      <div className="landing-blob blob-1"></div>
      <div className="landing-blob blob-2"></div>

      {/* Minimal Navbar */}
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={28} color="#26a69a" />
          <span className="logo-text">Career<span style={{ color: '#26a69a' }}>Bridge</span></span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/recruiter/" className="btn-login" style={{ textDecoration: 'none' }}>Recruiter Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-badge">Welcome to the future of networking</div>
        <h1 className="hero-title">One Platform.<br/>Infinite Careers.</h1>
        <p className="hero-subtitle">
          Built for students, professionals, senior experts, and the people who hire them. 
          Stop competing in a crowded room. Find your space.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary-large" onClick={() => setActiveTab('auth')}>
            Enter CareerBridge <ArrowRight size={20} />
          </button>
          <button className="btn-secondary-large" onClick={() => setActiveTab('jobs')}>
            Browse Jobs
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="features-grid">
        <div className="feature-card card-green">
          <div className="feature-icon-wrapper">
            <GraduationCap size={30} />
          </div>
          <h3 className="feature-title">For Interns</h3>
          <p className="feature-desc">
            Find paid internships, stipends, and entry-level roles without competing against 10-year veterans. Start your journey here.
          </p>
        </div>

        <div className="feature-card card-blue">
          <div className="feature-icon-wrapper">
            <Briefcase size={30} />
          </div>
          <h3 className="feature-title">For Professionals</h3>
          <p className="feature-desc">
            Connect with top tier companies, grow your network, and discover high-paying remote, hybrid, and on-site opportunities.
          </p>
        </div>

        <div className="feature-card card-purple">
          <div className="feature-icon-wrapper">
            <UserCheck size={30} />
          </div>
          <h3 className="feature-title">For Seniors (55+)</h3>
          <p className="feature-desc">
            Retiring doesn't mean stopping. Discover part-time advisory, consulting, and mentoring roles specifically designed for seasoned experts.
          </p>
        </div>
      </section>
    </div>
  );
}
