import React, { useState } from 'react';
import { Layers, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './AuthPage.css';

export default function AuthPage() {
  const { setActiveTab, setIsAuthenticated, redirectAfterAuth, setRedirectAfterAuth } = useApp();
  const [isLogin, setIsLogin] = useState(true);

  // Mock authentication handler
  const handleAuth = (e) => {
    e.preventDefault();
    // Simulate API call delay
    setTimeout(() => {
      setIsAuthenticated(true);
      setActiveTab(redirectAfterAuth || 'feed');
      setRedirectAfterAuth(null); // Clear the redirect state
    }, 500);
  };

  return (
    <div className="auth-container">
      {/* LEFT PANEL */}
      <div className="auth-banner">
        <div className="auth-banner-content">
          <h1 className="auth-banner-title">
            Your career,<br />
            accelerated.
          </h1>
          <p className="auth-banner-subtitle">
            Join thousands of interns, professionals, and senior experts connecting on the most advanced professional network.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-form-wrapper">
        <div className="auth-box">
          <div className="auth-logo">
            <Layers size={24} color="var(--accent-green)" />
            <span>Career<span style={{ color: 'var(--accent-green)' }}>Bridge</span></span>
          </div>

          <h2 className="auth-heading">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p className="auth-subheading">
            {isLogin ? 'Enter your details to access your account.' : 'Start your journey with CareerBridge today.'}
          </p>

          <form className="auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input type="text" className="auth-input" placeholder="e.g. Jane Doe" required />
              </div>
            )}
            
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" className="auth-input" placeholder="you@example.com" required />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input type="password" className="auth-input" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn-auth-primary">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-divider">OR CONTINUE WITH</div>

          <div className="social-buttons">
            <button type="button" className="btn-social" onClick={handleAuth}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.78-.04 1.94-.8 3.42-.74 1.25.04 2.55.51 3.25 1.5-3.07 1.83-2.58 5.76.5 7.03-.71 1.77-1.58 3.42-2.25 4.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>

            <button type="button" className="btn-social" onClick={handleAuth}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <button type="button" className="btn-social" onClick={handleAuth}>
              <Smartphone size={18} />
              Phone Number
            </button>
          </div>

          <div className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
