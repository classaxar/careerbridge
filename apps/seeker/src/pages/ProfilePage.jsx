import { useState } from 'react';
import { currentUser } from '../data/mockData';
import {
  MapPin, Link2, Edit3, Award, Briefcase, GraduationCap,
  Star, PlusCircle, TrendingUp, BarChart2, Download,
} from 'lucide-react';
import './ProfilePage.css';

const skills = [
  { name:'React.js', level:95, endorsed:42 },
  { name:'Node.js',  level:82, endorsed:28 },
  { name:'TypeScript', level:88, endorsed:35 },
  { name:'System Design', level:74, endorsed:18 },
  { name:'GraphQL', level:70, endorsed:12 },
  { name:'AWS',     level:68, endorsed:22 },
];

const experience = [
  {
    role:'Full-Stack Developer',
    company:'Razorpay',
    period:'Jan 2023 – Present · 1yr 3mo',
    desc:'Building payment infrastructure used by 8M+ merchants. Led migration of legacy PHP monolith to Node.js microservices, reducing latency by 40%.',
    tags:['React','Node.js','Kafka','PostgreSQL'],
    logo:'R', logoColor:'#2962ff',
  },
  {
    role:'Frontend Engineer',
    company:'Juspay',
    period:'Jun 2021 – Dec 2022 · 1yr 6mo',
    desc:'Developed payment UX for major Indian banks. Implemented A/B testing framework that improved conversion by 18%.',
    tags:['React','TypeScript','WebSockets'],
    logo:'J', logoColor:'#26a69a',
  },
];

const education = [
  {
    degree:'B.Tech Computer Science',
    school:'IIT Bombay',
    period:'2017 – 2021',
    gpa:'8.9 / 10',
    logo:'I', logoColor:'#ef5350',
  },
];

const certifications = [
  { name:'AWS Solutions Architect – Associate', issuer:'Amazon Web Services', date:'Mar 2024', badge:'☁️' },
  { name:'Google Cloud Professional Developer', issuer:'Google', date:'Nov 2023', badge:'🌐' },
  { name:'React Advanced Patterns', issuer:'Frontend Masters', date:'Jul 2023', badge:'⚛️' },
];

function SkillBar({ skill }) {
  return (
    <div className="skill-row">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm fw-600">{skill.name}</span>
        <span className="text-xs text-muted">{skill.endorsed} endorsements</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const sections = ['about', 'experience', 'education', 'skills', 'certifications'];

  return (
    <div className="profile-page">
      {/* ── HERO CARD ── */}
      <div className="profile-hero card">
        <div className="profile-hero-banner">
          {/* Animated chart background */}
          <svg className="banner-chart" viewBox="0 0 800 100" preserveAspectRatio="none">
            <polyline
              points="0,70 100,55 200,65 300,30 400,45 500,20 600,35 700,15 800,25"
              fill="none"
              stroke="rgba(38,166,154,0.4)"
              strokeWidth="2"
            />
            <polyline
              points="0,70 100,55 200,65 300,30 400,45 500,20 600,35 700,15 800,25 800,100 0,100"
              fill="rgba(38,166,154,0.06)"
            />
          </svg>
        </div>

        <div className="profile-hero-body">
          <div className="profile-hero-row">
            <div className="profile-hero-avatar">
              <img
                src="/mango-avatar.png"
                alt="Akshar Modi"
                className="avatar avatar-xl"
                style={{ border:'4px solid var(--bg-card)', boxShadow:'var(--shadow-md)' }}
              />
              <span className="profile-mode-badge badge badge-green">Open to Work</span>
            </div>
            <div className="profile-hero-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(v=>!v)}>
                <Edit3 size={14}/> {isEditing ? 'Save' : 'Edit Profile'}
              </button>
              <button className="btn btn-primary btn-sm">
                <Download size={14} /> Download CV
              </button>
            </div>
          </div>

          <div className="profile-hero-info">
            <h1 className="profile-name">{currentUser.name}</h1>
            {isEditing ? (
              <input className="input" defaultValue={currentUser.headline} style={{ marginTop:'6px' }} />
            ) : (
              <p className="profile-headline">{currentUser.headline}</p>
            )}
            <div className="profile-meta">
              <span className="profile-meta-item"><MapPin size={13}/> {currentUser.location}</span>
              <span className="profile-meta-item"><Link2 size={13}/> careerbridge.in/akshar</span>
              <span className="profile-meta-item" style={{ color:'var(--accent-green)' }}>
                <TrendingUp size={13}/> 483 connections · 1,240 followers
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="profile-stats-row">
            {[
              { label:'Profile Views', value:'248', icon:BarChart2, color:'var(--accent-blue-light)', change:'+12%' },
              { label:'Post Impressions', value:'1.2k', icon:TrendingUp, color:'var(--accent-green)', change:'+28%' },
              { label:'Search Appearances', value:'64', icon:Star, color:'var(--accent-amber)', change:'+5%' },
            ].map(s => (
              <div key={s.label} className="profile-stat-card">
                <s.icon size={16} style={{ color: s.color }} />
                <span className="profile-stat-val">{s.value}</span>
                <span className="text-xs text-muted">{s.label}</span>
                <span className="text-xs text-green">{s.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION TABS ── */}
      <div className="profile-section-tabs card">
        <div className="card-body" style={{ padding:'0' }}>
          <div className="psec-tabs">
            {sections.map(s => (
              <button
                key={s}
                className={`psec-tab ${activeSection === s ? 'active' : ''}`}
                onClick={() => setActiveSection(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="profile-content">
        {activeSection === 'about' && (
          <div className="card fade-in-up">
            <div className="card-body">
              <h2 className="section-h2">About</h2>
              <p style={{ fontSize:'14px', lineHeight:'1.75', color:'var(--text-secondary)' }}>
                Full-Stack Developer with 3+ years of experience building scalable web applications in the fintech space.
                Passionate about developer experience, real-time systems, and clean architecture.
                <br/><br/>
                I specialize in React/TypeScript frontends and Node.js backends, with a deep interest in distributed systems and performance optimization.
                <br/><br/>
                Currently at Razorpay, building payment infrastructure for India's growing digital economy. Open to senior roles and advisory positions at high-growth startups.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="card fade-in-up">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="section-h2">Experience</h2>
                <button className="btn btn-ghost btn-sm"><PlusCircle size={13}/> Add</button>
              </div>
              {experience.map((e, i) => (
                <div key={i} className="exp-row">
                  <div className="company-logo" style={{ background:`${e.logoColor}20`, color:e.logoColor, borderColor:`${e.logoColor}44` }}>
                    {e.logo}
                  </div>
                  <div style={{ flex:1 }}>
                    <p className="fw-700">{e.role}</p>
                    <p className="text-sm" style={{ color:'var(--text-secondary)' }}>{e.company} · {e.period}</p>
                    <p className="text-sm" style={{ color:'var(--text-muted)', marginTop:'6px', lineHeight:'1.6' }}>{e.desc}</p>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="card fade-in-up">
            <div className="card-body">
              <h2 className="section-h2">Education</h2>
              {education.map((e, i) => (
                <div key={i} className="exp-row">
                  <div className="company-logo" style={{ background:`${e.logoColor}20`, color:e.logoColor, borderColor:`${e.logoColor}44` }}>
                    {e.logo}
                  </div>
                  <div>
                    <p className="fw-700">{e.degree}</p>
                    <p className="text-sm text-muted">{e.school} · {e.period}</p>
                    <p className="text-sm mt-2" style={{ color:'var(--accent-green)' }}>GPA: {e.gpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="card fade-in-up">
            <div className="card-body">
              <h2 className="section-h2">Skills</h2>
              <div className="skills-grid">
                {skills.map(s => <SkillBar key={s.name} skill={s} />)}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'certifications' && (
          <div className="card fade-in-up">
            <div className="card-body">
              <h2 className="section-h2">Certifications</h2>
              <div className="certs-grid">
                {certifications.map(c => (
                  <div key={c.name} className="cert-card card">
                    <div className="card-body">
                      <span style={{ fontSize:'28px' }}>{c.badge}</span>
                      <p className="fw-700 text-sm mt-2">{c.name}</p>
                      <p className="text-xs text-muted">{c.issuer}</p>
                      <p className="text-xs" style={{ color:'var(--accent-green)', marginTop:'4px' }}>{c.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
