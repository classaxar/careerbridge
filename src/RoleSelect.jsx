import { Layers, Briefcase, GraduationCap, UserCheck, ArrowRight } from 'lucide-react';
import './RoleSelect.css';

export default function RoleSelect({ onSelect }) {
  return (
    <div className="role-select-page">
      {/* Background grid */}
      <div className="role-bg-grid" aria-hidden />

      {/* Logo */}
      <div className="role-logo">
        <Layers size={28} className="role-logo-icon" />
        <span className="role-logo-text">Career<span>Bridge</span></span>
      </div>

      <div className="role-content">
        <div className="role-hero fade-in-up">
          <h1 className="role-title">
            One Platform,<br/>
            <span className="role-title-accent">Infinite Careers.</span>
          </h1>
          <p className="role-subtitle">
            Built for students, professionals, senior experts, and the people who hire them.
            Choose your experience to get started.
          </p>
        </div>

        <div className="role-cards fade-in-up delay-2">
          {/* Job Seeker Card */}
          <button className="role-card seeker" onClick={() => onSelect('seeker')}>
            <div className="role-card-icon-wrap seeker-icon">
              <Briefcase size={28} />
            </div>
            <div className="role-card-body">
              <h2>Job Seeker</h2>
              <p>Browse jobs, connect with professionals, and grow your career.</p>
              <div className="role-card-modes">
                <span className="badge badge-green"><GraduationCap size={10}/>Intern</span>
                <span className="badge badge-blue"><Briefcase size={10}/>Professional</span>
                <span className="badge badge-purple"><UserCheck size={10}/>Senior 55+</span>
              </div>
            </div>
            <ArrowRight size={20} className="role-card-arrow" />
          </button>

          {/* Recruiter Card */}
          <button className="role-card recruiter" onClick={() => onSelect('recruiter')}>
            <div className="role-card-icon-wrap recruiter-icon">
              <UserCheck size={28} />
            </div>
            <div className="role-card-body">
              <h2>Recruiter</h2>
              <p>Post jobs, review applicants, and find the right talent fast.</p>
              <div className="role-card-modes">
                <span className="badge badge-amber">📊 Dashboard</span>
                <span className="badge badge-amber">📝 Post Jobs</span>
                <span className="badge badge-amber">👥 Applicants</span>
              </div>
            </div>
            <ArrowRight size={20} className="role-card-arrow" />
          </button>
        </div>

        <p className="role-footer fade-in-up delay-4">
          CareerBridge · Frontend Engineering Project · 2025
        </p>
      </div>
    </div>
  );
}
