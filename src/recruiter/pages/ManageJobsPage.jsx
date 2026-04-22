import { useEffect, useState } from 'react';
import { Trash2, Users, PauseCircle, PlayCircle, PlusCircle, Flame, Edit3 } from 'lucide-react';

export default function ManageJobsPage({ onViewApplicants, onNewJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchJobs = () => {
    fetch('/api/jobs?recruiterId=r1')
      .then(r => r.json())
      .then(d => { setJobs(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchJobs(); }, []);

  const deleteJob = async (id) => {
    if (!confirm('Delete this job posting? This cannot be undone.')) return;
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    setJobs(j => j.filter(job => job.id !== id));
  };

  const toggleStatus = async (job) => {
    const newStatus = job.status === 'active' ? 'paused' : 'active';
    await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setJobs(j => j.map(item => item.id === job.id ? { ...item, status: newStatus } : item));
  };

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.type === filter);

  return (
    <div className="manage-jobs-page">
      {/* Toolbar */}
      <div className="manage-toolbar">
        <div className="flex gap-2">
          {['all','internship','normal','senior'].map(f => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Jobs' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={onNewJob}>
          <PlusCircle size={14}/> Post New Job
        </button>
      </div>

      {loading ? (
        <div className="jobs-empty"><p className="text-muted">Loading…</p></div>
      ) : filtered.length === 0 ? (
        <div className="jobs-empty card">
          <div className="card-body" style={{ textAlign:'center', padding:'60px' }}>
            <p className="text-muted mb-3">No job listings found.</p>
            <button className="btn btn-primary" onClick={onNewJob}>
              <PlusCircle size={14}/> Post Your First Job
            </button>
          </div>
        </div>
      ) : (
        <div className="manage-jobs-table card">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Type</th>
                <th>Location</th>
                <th>Comp.</th>
                <th>Applicants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job.id} className="jobs-table-row">
                  <td>
                    <div className="flex items-center gap-10">
                      <div className="mini-job-logo" style={{ background:`${job.logoColor}20`, color:job.logoColor }}>
                        {job.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="fw-600 text-sm">{job.title}</p>
                          {job.hot && <Flame size={12} style={{ color:'var(--accent-red)'}} />}
                        </div>
                        <p className="text-xs text-muted">{job.company}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${job.type === 'internship' ? 'green' : job.type === 'senior' ? 'purple' : 'blue'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="text-sm text-muted">{job.location}</td>
                  <td className="text-sm fw-600" style={{ color:'var(--accent-green)' }}>
                    {job.stipend || job.salary || '—'}
                  </td>
                  <td>
                    <button
                      className="applicants-count-btn"
                      onClick={() => onViewApplicants(job.id)}
                    >
                      <Users size={12}/> {job.applicants}
                    </button>
                  </td>
                  <td>
                    <span className={`status-badge status-${job.status}`}>{job.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="table-action-btn"
                        onClick={() => toggleStatus(job)}
                        title={job.status === 'active' ? 'Pause' : 'Activate'}
                      >
                        {job.status === 'active'
                          ? <PauseCircle size={15} style={{ color:'var(--accent-amber)' }}/>
                          : <PlayCircle size={15} style={{ color:'var(--accent-green)' }}/>
                        }
                      </button>
                      <button
                        className="table-action-btn"
                        onClick={() => deleteJob(job.id)}
                        title="Delete"
                      >
                        <Trash2 size={15} style={{ color:'var(--accent-red)' }}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
