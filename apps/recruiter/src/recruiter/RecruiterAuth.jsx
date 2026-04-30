import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './RecruiterAuth.css';

export default function RecruiterAuth() {
  const { setIsAuthenticated } = useApp();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 500);
  };

  return (
    <div className="recruiter-auth-container">
      <div className="recruiter-auth-left">
        <div className="recruiter-auth-content">
          <h1 className="recruiter-auth-title">
            Hire the top 1%<br />
            of talent.
          </h1>
          <p className="recruiter-auth-subtitle">
            Welcome to the CareerBridge Employer Portal. Discover elite interns, proven professionals, and seasoned industry experts.
          </p>
        </div>
      </div>

      <div className="recruiter-auth-right">
        <div className="recruiter-auth-box">
          <div className="recruiter-auth-logo">
            <Layers size={24} color="var(--accent-green)" />
            <span>Career<span style={{ color: 'var(--accent-green)' }}>Bridge</span> <span style={{fontSize:'14px', color:'var(--text-muted)', fontWeight:500}}>for Employers</span></span>
          </div>

          <h2 className="recruiter-auth-heading">{isLogin ? 'Employer Login' : 'Create Employer Account'}</h2>
          <p className="recruiter-auth-subheading">
            {isLogin ? 'Access your dashboard and manage applications.' : 'Start hiring better candidates today.'}
          </p>

          <form className="recruiter-auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="recruiter-input-group">
                <label className="recruiter-input-label">Company Name</label>
                <input type="text" className="recruiter-input" placeholder="e.g. Acme Corp" required />
              </div>
            )}
            
            <div className="recruiter-input-group">
              <label className="recruiter-input-label">Work Email</label>
              <input type="email" className="recruiter-input" placeholder="name@company.com" required />
            </div>

            <div className="recruiter-input-group">
              <label className="recruiter-input-label">Password</label>
              <input type="password" className="recruiter-input" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn-recruiter-auth">
              {isLogin ? 'Sign In to Dashboard' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {isLogin ? "New to CareerBridge?" : "Already hiring?"}
            <span style={{ color: 'var(--accent-green)', fontWeight: 600, cursor: 'pointer', marginLeft: '4px' }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
