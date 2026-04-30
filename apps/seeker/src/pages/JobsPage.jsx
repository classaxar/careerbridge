import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin, Clock, Users, Flame, Bookmark, Send,
  SlidersHorizontal, Briefcase, GraduationCap, UserCheck,
  Search, RefreshCw, CheckCircle,
} from 'lucide-react';
import './JobsPage.css';

const categoryConfig = {
  internship: {
    label: 'Internship Opportunities',
    icon: GraduationCap,
    desc: 'Kickstart your career with top companies',
    color: 'var(--accent-green)',
    salaryLabel: 'Stipend',
    metaLabel: 'Duration',
  },
  normal: {
    label: 'Professional Roles',
    icon: Briefcase,
    desc: 'Mid to senior level full-time positions',
    color: 'var(--accent-blue-light)',
    salaryLabel: 'Salary',
    metaLabel: 'Experience',
  },
  senior: {
    label: 'Senior & Leadership Roles',
    icon: UserCheck,
    desc: 'C-suite, advisory, and board positions',
    color: '#a78bfa',
    salaryLabel: 'Compensation',
    metaLabel: 'Experience',
  },
};

const filters = ['All', 'Remote', 'Hybrid', 'On-site', 'Hot 🔥'];

// ─── Job Card ────────────────────────────────────────────────────
function JobCard({ job, cat, onApply }) {
  const { isAuthenticated, setActiveTab, setRedirectAfterAuth } = useApp();
  const [saved, setSaved] = useState(false);
  const cfg = categoryConfig[cat] || categoryConfig.normal;

  // Format posted date nicely
  const postedLabel = (() => {
    if (!job.posted) return '';
    const diff = Date.now() - new Date(job.posted).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  })();

  const requireAuth = (actionCallback) => {
    if (!isAuthenticated) {
      setRedirectAfterAuth('jobs');
      setActiveTab('auth');
    } else if (actionCallback) {
      actionCallback();
    }
  };

  return (
    <div className="job-card card fade-in-up">
      <div className="card-body">
        <div className="job-card-header">
          <div
            className="company-logo"
            style={{
              background: `linear-gradient(135deg, ${job.logoColor}33, ${job.logoColor}15)`,
              color: job.logoColor,
              borderColor: `${job.logoColor}44`,
            }}
          >
            {job.logo}
          </div>

          <div className="job-info">
            <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
              <h3 className="job-title">{job.title}</h3>
              {job.hot && (
                <span className="badge badge-red"><Flame size={10} /> Hot</span>
              )}
            </div>
            <p className="job-company">{job.company}</p>
          </div>

          <button
            className={`save-job-btn ${saved ? 'saved' : ''}`}
            onClick={() => requireAuth(() => setSaved(v => !v))}
          >
            <Bookmark size={16} fill={saved ? 'var(--accent-amber)' : 'none'} />
          </button>
        </div>

        {/* Meta row */}
        <div className="job-meta">
          <span className="job-meta-item"><MapPin size={12} /> {job.location}</span>
          <span className="job-meta-item"><Clock size={12} /> {postedLabel}</span>
          <span className="job-meta-item"><Users size={12} /> {job.applicants} applied</span>
        </div>

        {/* Compensation */}
        <div className="job-comp-row">
          <div>
            <p className="text-xs text-muted">{cfg.salaryLabel}</p>
            <p className="job-salary" style={{ color: cfg.color }}>
              {job.stipend || job.salary || '—'}
            </p>
          </div>
          {(job.duration || job.experience) && (
            <div>
              <p className="text-xs text-muted">{cfg.metaLabel}</p>
              <p className="fw-600 text-sm">{job.duration || job.experience}</p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="job-tags">
          {(job.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Actions */}
        <div className="job-actions">
          <button className="btn btn-primary btn-sm" onClick={() => requireAuth(() => onApply(job))}>
            <Send size={13} /> Apply Now
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => requireAuth()}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Apply Modal (posts to API) ──────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    name: 'Akshar Modi',
    email: 'akshar@email.com',
    portfolio: 'careerbridge.in/akshar',
    coverNote: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!job) return null;

  const handleApply = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job.id, ...form }),
      });
      setDone(true);
      setTimeout(() => { setDone(false); onClose(); }, 1800);
    } catch {
      alert('Could not submit. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content card" onClick={e => e.stopPropagation()}>
        <div className="card-body">
          {done ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle size={48} style={{ color: 'var(--accent-green)', marginBottom: '12px' }} />
              <h2>Application Sent!</h2>
              <p className="text-muted text-sm mt-2">The recruiter will review your profile.</p>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: '4px' }}>Apply for {job.title}</h2>
              <p className="text-muted text-sm" style={{ marginBottom: '20px' }}>
                {job.company} · {job.location}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  className="input"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <input
                  className="input"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                <input
                  className="input"
                  placeholder="LinkedIn / Portfolio URL"
                  value={form.portfolio}
                  onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))}
                />
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Why are you a great fit? (optional)"
                  style={{ resize: 'vertical' }}
                  value={form.coverNote}
                  onChange={e => setForm(f => ({ ...f, coverNote: e.target.value }))}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleApply}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting…' : 'Submit Application ✓'}
                </button>
                <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function JobsPage() {
  const { mode } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState(mode === 'senior' ? 'senior' : mode === 'internship' ? 'internship' : 'normal');
  const [applyJob, setApplyJob] = useState(null);
  const [search, setSearch] = useState('');

  // ── Fetch from API ──────────────────────────────────────────────
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = useCallback(() => {
    setLoading(true);
    setError('');
    fetch(`/api/jobs?type=${activeCategory}`)
      .then(r => r.json())
      .then(data => {
        setAllJobs(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load jobs — is the backend server running? (npm run server)');
        setLoading(false);
      });
  }, [activeCategory]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // ── Filter ──────────────────────────────────────────────────────
  const filtered = allJobs.filter(j => {
    const loc = (j.location || '').toLowerCase();
    if (activeFilter === 'Hot 🔥')  return j.hot;
    if (activeFilter === 'Remote')  return loc.includes('remote');
    if (activeFilter === 'Hybrid')  return loc.includes('hybrid');
    if (activeFilter === 'On-site') return !loc.includes('remote') && !loc.includes('hybrid');
    return true;
  }).filter(j =>
    !search ||
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    (j.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const cfg = categoryConfig[activeCategory];

  return (
    <div className="jobs-page">
      {/* ── Hero ── */}
      <div className="jobs-hero">
        <div className="jobs-hero-inner">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <cfg.icon size={24} style={{ color: cfg.color }} />
              <h1 className="jobs-hero-title">{cfg.label}</h1>
            </div>
            <p className="text-muted">{cfg.desc}</p>
          </div>
          <div className="jobs-search-bar">
            <Search size={15} className="jobs-search-icon" />
            <input
              className="jobs-search-input"
              placeholder="Search roles, companies, skills…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="jobs-category-tabs">
          {Object.entries(categoryConfig).map(([key, c]) => (
            <button
              key={key}
              className={`jobs-cat-tab ${activeCategory === key ? 'active' : ''}`}
              style={activeCategory === key ? { borderColor: c.color, color: c.color } : {}}
              onClick={() => setActiveCategory(key)}
            >
              <c.icon size={15} />
              {c.label.split(' ')[0]}
              {key === 'internship' && <span className="badge badge-green" style={{ fontSize: '10px' }}>New</span>}
              {key === 'senior'     && <span className="badge badge-purple" style={{ fontSize: '10px' }}>55+</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div className="jobs-filters-bar">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted" />
          <span className="text-sm text-muted fw-600">Filter:</span>
          {filters.map(f => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">
            {loading ? 'Loading…' : `${filtered.length} roles found`}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={fetchJobs} title="Refresh">
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{ background:'rgba(239,83,80,0.1)', border:'1px solid var(--accent-red)', borderRadius:'var(--radius-sm)', padding:'12px 16px', marginBottom:'16px', color:'var(--accent-red)', fontSize:'13px' }}>
          ⚠ {error}
        </div>
      )}

      {/* ── Skeleton / Grid ── */}
      <div className="jobs-grid">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="job-skeleton card">
              <div className="card-body">
                <div className="skeleton-row" style={{ width: '40%', height: '14px' }} />
                <div className="skeleton-row" style={{ width: '70%', height: '18px', marginTop: '8px' }} />
                <div className="skeleton-row" style={{ width: '55%', height: '12px', marginTop: '6px' }} />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="jobs-empty">
            <p className="text-muted">
              {search ? `No results for "${search}"` : 'No jobs in this category yet.'}
            </p>
          </div>
        ) : (
          filtered.map((job, i) => (
            <div key={job.id} style={{ animationDelay: `${i * 0.07}s` }}>
              <JobCard job={job} cat={activeCategory} onApply={setApplyJob} />
            </div>
          ))
        )}
      </div>

      <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
    </div>
  );
}
