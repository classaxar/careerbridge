import { useEffect, useState } from 'react';
import { Briefcase, Users, CheckCircle, XCircle, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react';
import '../RecruiterPortal.css';

export default function RecruiterDashboard({ onNavigate }) {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/jobs?recruiterId=r1').then(r => r.json()),
      fetch('/api/applications?recruiterId=r1').then(r => r.json()),
    ]).then(([jobsRes, appsRes]) => {
      setJobs(jobsRes.data || []);
      setApps(appsRes.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Jobs Posted',
      value: jobs.length,
      icon: Briefcase,
      color: 'var(--accent-blue-light)',
      bg: 'rgba(41,98,255,0.1)',
      change: '+2 this week',
    },
    {
      label: 'Total Applicants',
      value: apps.length,
      icon: Users,
      color: 'var(--accent-green)',
      bg: 'rgba(38,166,154,0.1)',
      change: `+${apps.filter(a => {
        const d = new Date(a.appliedAt);
        return Date.now() - d < 86400000;
      }).length} today`,
    },
    {
      label: 'Shortlisted',
      value: apps.filter(a => a.status === 'shortlisted').length,
      icon: TrendingUp,
      color: 'var(--accent-amber)',
      bg: 'rgba(245,158,11,0.1)',
      change: 'awaiting review',
    },
    {
      label: 'Accepted',
      value: apps.filter(a => a.status === 'accepted').length,
      icon: CheckCircle,
      color: 'var(--accent-green)',
      bg: 'rgba(38,166,154,0.08)',
      change: 'offers sent',
    },
  ];

  return (
    <div className="r-dashboard">
      {/* ── Stats ── */}
      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card card">
            <div className="card-body">
              <div className="flex justify-between items-center mb-3">
                <div className="stat-icon-wrap" style={{ background: s.bg, color: s.color }}>
                  <s.icon size={18} />
                </div>
                <span className="text-xs text-muted">{s.change}</span>
              </div>
              <div className="stat-value" style={{ color: s.color }}>
                {loading ? '—' : s.value}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div className="quick-actions-row">
        <button className="quick-action-card card" onClick={() => onNavigate('post-job')}>
          <div className="card-body flex items-center gap-3">
            <div className="quick-action-icon" style={{ background:'rgba(38,166,154,0.1)', color:'var(--accent-green)' }}>
              <PlusCircle size={20} />
            </div>
            <div>
              <p className="fw-700">Post a New Job</p>
              <p className="text-xs text-muted">Create a job listing for internship, full-time, or senior roles</p>
            </div>
            <ArrowRight size={16} className="text-muted" style={{ marginLeft:'auto' }} />
          </div>
        </button>
        <button className="quick-action-card card" onClick={() => onNavigate('applicants')}>
          <div className="card-body flex items-center gap-3">
            <div className="quick-action-icon" style={{ background:'rgba(41,98,255,0.1)', color:'var(--accent-blue-light)' }}>
              <Users size={20} />
            </div>
            <div>
              <p className="fw-700">Review Applicants</p>
              <p className="text-xs text-muted">Shortlist, accept, or reject pending applications</p>
            </div>
            <ArrowRight size={16} className="text-muted" style={{ marginLeft:'auto' }} />
          </div>
        </button>
      </div>

      {/* ── Recent Applications ── */}
      <div className="card mt-4">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontSize:'15px' }}>Recent Applications</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('applicants')}>
              View All <ArrowRight size={12}/>
            </button>
          </div>
          {loading ? (
            <p className="text-muted text-sm">Loading…</p>
          ) : apps.length === 0 ? (
            <p className="text-muted text-sm">No applications yet. Post a job to get started!</p>
          ) : (
            <div className="recent-apps-list">
              {apps.slice(0, 5).map(app => (
                <div key={app.id} className="recent-app-row">
                  <div className="avatar-placeholder avatar-sm" style={{ fontSize:'12px' }}>
                    {app.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <p className="fw-600 text-sm truncate">{app.name}</p>
                    <p className="text-xs text-muted truncate">{app.jobTitle} · {app.company}</p>
                  </div>
                  <span className={`status-badge status-${app.status}`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-muted" style={{ whiteSpace:'nowrap' }}>
                    {new Date(app.appliedAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Posted Jobs Summary ── */}
      <div className="card mt-4">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontSize:'15px' }}>Your Job Listings</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('manage')}>
              Manage <ArrowRight size={12}/>
            </button>
          </div>
          {loading ? (
            <p className="text-muted text-sm">Loading…</p>
          ) : jobs.length === 0 ? (
            <p className="text-muted text-sm">No jobs posted yet.</p>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {jobs.slice(0, 4).map(job => (
                <div key={job.id} className="mini-job-row">
                  <div className="mini-job-logo" style={{ background:`${job.logoColor}20`, color:job.logoColor }}>
                    {job.logo}
                  </div>
                  <div style={{ flex:1 }}>
                    <p className="fw-600 text-sm">{job.title}</p>
                    <p className="text-xs text-muted">{job.company} · {job.location}</p>
                  </div>
                  <span className={`badge badge-${job.type === 'internship' ? 'green' : job.type === 'senior' ? 'purple' : 'blue'}`}>
                    {job.type}
                  </span>
                  <span className="text-xs text-muted">{job.applicants} applied</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
