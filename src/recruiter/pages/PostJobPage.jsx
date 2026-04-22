import { useState } from 'react';
import { PlusCircle, X, Send, CheckCircle } from 'lucide-react';

const JOB_TYPES = [
  { value:'internship', label:'Internship', desc:'Stipend-based, temporary role' },
  { value:'normal',     label:'Full-Time Professional', desc:'Permanent role with salary' },
  { value:'senior',     label:'Senior / Leadership', desc:'C-suite, advisory, or board roles' },
];

const COLORS = ['#26a69a','#2962ff','#7c3aed','#f59e0b','#ef5350','#10b981'];

export default function PostJobPage({ onSuccess }) {
  const [form, setForm] = useState({
    title: '', company: '', location: '', type: 'normal',
    salary: '', stipend: '', duration: '', experience: '',
    description: '', tags: [], logoColor: '#26a69a', hot: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const removeTag = (t) => set('tags', form.tags.filter(x => x !== t));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.type) {
      setError('Title, company, and job type are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recruiterId: 'r1', logo: form.company.charAt(0).toUpperCase() }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onSuccess?.(); }, 1800);
    } catch (err) {
      setError(err.message || 'Failed to post job. Is the server running?');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="post-success-screen">
        <CheckCircle size={56} style={{ color:'var(--accent-green)' }} />
        <h2>Job Posted Successfully!</h2>
        <p className="text-muted">Redirecting to Manage Jobs…</p>
      </div>
    );
  }

  return (
    <div className="post-job-page">
      <form className="post-job-form card" onSubmit={handleSubmit}>
        <div className="card-body">
          <h2 className="form-section-title">Basic Information</h2>

          {/* Job Type */}
          <div className="form-group">
            <label className="form-label">Job Type *</label>
            <div className="type-selector">
              {JOB_TYPES.map(jt => (
                <button
                  key={jt.value}
                  type="button"
                  className={`type-option ${form.type === jt.value ? 'selected' : ''}`}
                  onClick={() => set('type', jt.value)}
                >
                  <span className="fw-600">{jt.label}</span>
                  <span className="text-xs text-muted">{jt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title + Company */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input className="input" placeholder="e.g., Senior React Engineer" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Company *</label>
              <input className="input" placeholder="e.g., Razorpay" value={form.company} onChange={e => set('company', e.target.value)} />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="input" placeholder="e.g., Bengaluru (Hybrid) or Remote" value={form.location} onChange={e => set('location', e.target.value)} />
          </div>

          <div className="divider" />
          <h2 className="form-section-title">Compensation & Requirements</h2>

          {form.type === 'internship' ? (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Stipend</label>
                <input className="input" placeholder="e.g., ₹20,000/mo" value={form.stipend} onChange={e => set('stipend', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input className="input" placeholder="e.g., 3 months" value={form.duration} onChange={e => set('duration', e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Salary / CTC</label>
                <input className="input" placeholder="e.g., ₹25–40 LPA" value={form.salary} onChange={e => set('salary', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Experience Required</label>
                <input className="input" placeholder="e.g., 3–6 years" value={form.experience} onChange={e => set('experience', e.target.value)} />
              </div>
            </div>
          )}

          <div className="divider" />
          <h2 className="form-section-title">Job Description</h2>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="input"
              rows={5}
              placeholder="Describe the role, responsibilities, and what you're looking for…"
              style={{ resize:'vertical' }}
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          {/* Tags / Skills */}
          <div className="form-group">
            <label className="form-label">Required Skills / Tags</label>
            <div className="tag-input-row">
              <input
                className="input"
                placeholder="e.g., React, Python, Figma (press Enter)"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" className="btn btn-ghost btn-sm" onClick={addTag}>
                <PlusCircle size={14}/> Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="tags-list mt-2">
                {form.tags.map(t => (
                  <span key={t} className="tag" style={{ display:'inline-flex', alignItems:'center', gap:'4px' }}>
                    {t}
                    <button type="button" onClick={() => removeTag(t)} style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', lineHeight:1, padding:0 }}>
                      <X size={10}/>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Logo color + Hot flag */}
          <div className="form-row" style={{ alignItems:'flex-start' }}>
            <div className="form-group">
              <label className="form-label">Brand Color</label>
              <div className="color-picker">
                {COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`color-dot ${form.logoColor === c ? 'selected' : ''}`}
                    style={{ background: c }}
                    onClick={() => set('logoColor', c)}
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Mark as Hot 🔥</label>
              <label className="toggle-switch">
                <input type="checkbox" checked={form.hot} onChange={e => set('hot', e.target.checked)} />
                <span className="toggle-track" />
              </label>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Send size={15} />
              {submitting ? 'Posting…' : 'Post Job Listing'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setForm({ title:'',company:'',location:'',type:'normal',salary:'',stipend:'',duration:'',experience:'',description:'',tags:[],logoColor:'#26a69a',hot:false })}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
