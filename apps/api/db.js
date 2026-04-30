import { v4 as uuid } from 'uuid';

// ── Pre-seeded Jobs ─────────────────────────────────────────────
export let jobs = [
  {
    id: uuid(), recruiterId: 'r1', title: 'Frontend Intern – React/TypeScript',
    company: 'Zerodha', location: 'Bengaluru (Hybrid)', type: 'internship',
    stipend: '₹25,000/mo', duration: '3 months', experience: '',
    description: 'Work with our fintech team building real-time trading UIs using React and WebSockets.',
    tags: ['React', 'TypeScript', 'WebSockets'],
    status: 'active', hot: true, applicants: 142, posted: new Date().toISOString(),
    logo: 'Z', logoColor: '#26a69a',
  },
  {
    id: uuid(), recruiterId: 'r1', title: 'ML Research Intern',
    company: 'Flipkart', location: 'Remote', type: 'internship',
    stipend: '₹30,000/mo', duration: '6 months', experience: '',
    description: 'Research and implement LLM-based recommendation systems for e-commerce.',
    tags: ['Python', 'PyTorch', 'LLMs'],
    status: 'active', hot: true, applicants: 398, posted: new Date().toISOString(),
    logo: 'F', logoColor: '#2962ff',
  },
  {
    id: uuid(), recruiterId: 'r2', title: 'Senior Frontend Engineer',
    company: 'Razorpay', location: 'Bengaluru', type: 'normal',
    stipend: '', duration: '', experience: '4–7 years',
    salary: '₹32–45 LPA',
    description: 'Lead frontend architecture for our payments dashboard serving 8M+ merchants.',
    tags: ['React', 'Node.js', 'System Design'],
    status: 'active', hot: true, applicants: 78, posted: new Date().toISOString(),
    logo: 'R', logoColor: '#2962ff',
  },
  {
    id: uuid(), recruiterId: 'r2', title: 'Chief Technology Officer',
    company: 'FinTrust Ventures', location: 'Mumbai', type: 'senior',
    stipend: '', duration: '', experience: '20+ years',
    salary: '₹1.2–2 Cr CTC',
    description: 'Lead technology vision for our growing fintech portfolio of 12 companies.',
    tags: ['Leadership', 'Architecture', 'Fintech'],
    status: 'active', hot: true, applicants: 12, posted: new Date().toISOString(),
    logo: 'FT', logoColor: '#26a69a',
  },
];

// ── Pre-seeded Applications ──────────────────────────────────────
export let applications = [
  {
    id: uuid(), jobId: jobs[0].id, recruiterId: 'r1',
    name: 'Riya Singh', email: 'riya@college.edu',
    portfolio: 'github.com/riyasingh', coverNote: 'Huge fan of Zerodha! I\'ve built 3 trading tools as side projects using React.',
    status: 'pending', appliedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: uuid(), jobId: jobs[0].id, recruiterId: 'r1',
    name: 'Karan Mehta', email: 'karan.m@iit.ac.in',
    portfolio: 'karanbuild.vercel.app', coverNote: 'IIT Bombay CS junior with WebSocket experience from my fintech project.',
    status: 'shortlisted', appliedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: uuid(), jobId: jobs[2].id, recruiterId: 'r2',
    name: 'Akshar Modi', email: 'akshar@email.com',
    portfolio: 'nexusnet.in/akshar', coverNote: 'I\'ve been building payment UIs for 3 years and would love to bring that to Razorpay.',
    status: 'pending', appliedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];
