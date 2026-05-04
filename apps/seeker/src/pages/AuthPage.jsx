import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './AuthPage.css';

export default function AuthPage() {
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
      <div className="auth-form-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-card)' }}>
        <SignIn 
          routing="hash" 
          appearance={{
            elements: {
              rootBox: { margin: 'auto' },
              card: { backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid var(--border)' },
              headerTitle: { color: 'var(--text-primary)' },
              headerSubtitle: { color: 'var(--text-muted)' },
              socialButtonsBlockButton: { border: '1px solid var(--border)', color: 'var(--text-primary)' },
              formFieldLabel: { color: 'var(--text-secondary)' },
              formFieldInput: { backgroundColor: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-primary)' },
              footerActionText: { color: 'var(--text-muted)' },
              footerActionLink: { color: 'var(--accent-green)' }
            }
          }}
        />
      </div>
    </div>
  );
}
