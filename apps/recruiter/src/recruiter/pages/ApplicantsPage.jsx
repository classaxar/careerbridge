import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Star, Mail, Globe, Clock, Filter } from 'lucide-react';

const STATUS_FLOW = ['pending', 'shortlisted', 'accepted', 'rejected'];
const STATUS_COLOR = {
  pending:     'badge-amber',
  shortlisted: 'badge-blue',
  accepted:    'badge-green',
  rejected:    'badge-red',
};

export default function ApplicantsPage({ selectedJobId }) {
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterJob, setFilterJob] = useState(selectedJobId || 'all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/applications?recruiterId=r1').then(r => r.json()),
      fetch('/api/jobs?recruiterId=r1').then(r => r.json()),
    ]).then(([appsRes, jobsRes]) => {
      setApps(appsRes.data || []);
      setJobs(jobsRes.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // update filter if prop changes
  useEffect(() => {
    if (selectedJobId) setFilterJob(selectedJobId);
  }, [selectedJobId]);

  const updateStatus = async (appId, status) => {
    const res = await fetch(`/api/applications/${appId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setApps(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    }
  };

  const filtered = apps.filter(a => {
    if (filterJob !== 'all' && a.jobId !== filterJob) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  const counts = {
    all: apps.length,
    pending: apps.filter(a=>a.status==='pending').length,
    shortlisted: apps.filter(a=>a.status==='shortlisted').length,
    accepted: apps.filter(a=>a.status==='accepted').length,
    rejected: apps.filter(a=>a.status==='rejected').length,
  };

  return (
    <div className="applicants-page">
      {/* Filters */}
      <div className="applicants-filters">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-muted" />
          <span className="text-xs text-muted fw-600">Job:</span>
          <select
            className="input"
            style={{ width:'auto', padding:'5px 10px', fontSize:'12px' }}
            value={filterJob}
            onChange={e => setFilterJob(e.target.value)}
          >
            <option value="all">All Jobs</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
        <div className="status-filter-tabs">
          {['all','pending','shortlisted','accepted','rejected'].map(s => (
            <button
              key={s}
              className={`filter-pill ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              <span className="pill-count">{counts[s]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Application Cards */}
      {loading ? (
        <p className="text-muted">Loading applications…</p>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign:'center', padding:'60px' }}>
            <p className="text-muted">No applications match the selected filters.</p>
          </div>
        </div>
      ) : (
        <div className="applicants-grid">
          {filtered.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return (
              <div key={app.id} className="applicant-card card">
                <div className="card-body">
                  {/* Header */}
                  <div className="app-card-header">
                    <div className="avatar-placeholder avatar-md" style={{ fontSize:'14px' }}>
                      {app.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div style={{ flex:1 }}>
                      <p className="fw-700">{app.name}</p>
                      <p className="text-xs text-muted">{app.jobTitle || job?.title}</p>
                    </div>
                    <span className={`badge ${STATUS_COLOR[app.status] || 'badge-amber'}`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="app-details">
                    <div className="app-detail-item">
                      <Mail size={12}/> <a href={`mailto:${app.email}`}>{app.email}</a>
                    </div>
                    {app.portfolio && (
                      <div className="app-detail-item">
                        <Globe size={12}/> <a href={`https://${app.portfolio}`} target="_blank" rel="noreferrer">{app.portfolio}</a>
                      </div>
                    )}
                    <div className="app-detail-item">
                      <Clock size={12}/> Applied {new Date(app.appliedAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Cover note */}
                  {app.coverNote && (
                    <div className="cover-note">
                      <p className="text-xs text-muted" style={{ fontStyle:'italic', lineHeight:'1.6' }}>
                        "{app.coverNote}"
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="app-actions">
                    <button
                      className={`app-action-btn accept ${app.status === 'accepted' ? 'active' : ''}`}
                      onClick={() => updateStatus(app.id, 'accepted')}
                      title="Accept"
                    >
                      <CheckCircle size={15}/> Accept
                    </button>
                    <button
                      className={`app-action-btn shortlist ${app.status === 'shortlisted' ? 'active' : ''}`}
                      onClick={() => updateStatus(app.id, 'shortlisted')}
                      title="Shortlist"
                    >
                      <Star size={15}/> Shortlist
                    </button>
                    <button
                      className={`app-action-btn reject ${app.status === 'rejected' ? 'active' : ''}`}
                      onClick={() => updateStatus(app.id, 'rejected')}
                      title="Reject"
                    >
                      <XCircle size={15}/> Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
