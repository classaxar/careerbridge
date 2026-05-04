import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './RecruiterAuth.css';

export default function RecruiterAuth() {
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

      <div className="recruiter-auth-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
