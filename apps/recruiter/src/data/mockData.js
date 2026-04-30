// ── TICKER DATA ──────────────────────────────────────────────────
export const tickerData = [
  { symbol:'NIFTY', price:'22,450.30', change:'+1.24%', up:true },
  { symbol:'SENSEX', price:'73,828.40', change:'+0.98%', up:true },
  { symbol:'RELIANCE', price:'2,891.55', change:'-0.32%', up:false },
  { symbol:'TCS', price:'3,760.20', change:'+1.15%', up:true },
  { symbol:'INFY', price:'1,482.80', change:'+0.72%', up:true },
  { symbol:'HDFC', price:'1,672.45', change:'-0.18%', up:false },
  { symbol:'WIPRO', price:'482.30', change:'+2.10%', up:true },
  { symbol:'HCL', price:'1,212.60', change:'+0.55%', up:true },
  { symbol:'BAJAJ', price:'7,280.00', change:'-0.44%', up:false },
  { symbol:'ICICI', price:'1,055.90', change:'+1.89%', up:true },
];

// ── USERS ─────────────────────────────────────────────────────────
export const currentUser = {
  id:'u1',
  name:'Akshar Modi',
  headline:'Full-Stack Developer | React · Node.js | Open to Opportunities',
  location:'Bengaluru, Karnataka',
  connections: 483,
  followers: 1240,
  mode:'normal',
  avatar: null,
  initials:'AM',
};

// ── POSTS / FEED ──────────────────────────────────────────────────
export const posts = [
  {
    id:'p1',
    author:{ name:'Priya Mehta', headline:'Senior SWE @ Google | Ex-Microsoft', initials:'PM', color:'#2962ff' },
    time:'2h ago',
    content:`🚀 Just shipped a new feature at Google! The TradingView-style dashboards we built for our internal analytics tool are now live for 20K+ engineers.\n\nKey insight: dark-first UI with real-time data isn't just for fintech — it helps engineers stay focused during long code review sessions.\n\nWho else is building developer tooling? Let's connect! 👇`,
    likes:342, comments:58, reposts:24,
    tags:['Engineering','ProductLaunch','Frontend'],
    liked:false,
  },
  {
    id:'p2',
    author:{ name:'Rahul Verma', headline:'CEO @ FinSync | Angel Investor', initials:'RV', color:'#26a69a' },
    time:'5h ago',
    content:`The Indian startup ecosystem is maturing fast. 📈\n\nThis week I spoke with 12 founders across fintech, edtech, and SaaS. One common thread: HIRING is harder than fundraising right now.\n\nIf you're a talented engineer or product manager looking for senior roles, DM me. We're building the job board that actually works.`,
    likes:891, comments:134, reposts:67,
    tags:['Startups','Hiring','VC'],
    liked:true,
  },
  {
    id:'p3',
    author:{ name:'Dr. Sunita Rao', headline:'Retired CTO | Mentor | Senior Tech Community Lead', initials:'SR', color:'#7c3aed' },
    time:'8h ago',
    content:`To all seniors re-entering the workforce after 55+: your experience IS your superpower. 💪\n\nI spent 30 years building distributed systems. When I joined the NextGen mentorship program, I thought I was the one giving knowledge. Turns out — the learning was mutual.\n\nDon't let age be a barrier. The tech world needs your wisdom.`,
    likes:2104, comments:287, reposts:312,
    tags:['SeniorProfessionals','Mentorship','InclusiveHiring'],
    liked:false,
  },
  {
    id:'p4',
    author:{ name:'Kavya Nair', headline:'CS Student @ IIT Bombay | Intern @ Zerodha', initials:'KN', color:'#f59e0b' },
    time:'12h ago',
    content:`Day 1 of my summer internship at Zerodha done! 🎉\n\nBuilding real-time order-book visualization using WebSockets + React. The TradingView charting library is incredible.\n\nTip for fellow interns: ask a LOT of questions in the first week. Nobody expects you to know everything. They hired you to learn fast.\n\n#internship #fintech #zerodha`,
    likes:567, comments:89, reposts:43,
    tags:['Internship','Fintech','StudentLife'],
    liked:false,
  },
];

// ── JOBS ──────────────────────────────────────────────────────────
export const jobs = {
  internship:[
    {
      id:'j1', title:'Frontend Intern – React/TypeScript',
      company:'Zerodha', location:'Bengaluru (Hybrid)',
      stipend:'₹25,000/mo', duration:'3 months',
      tags:['React','TypeScript','WebSockets'],
      applicants:142, posted:'1 day ago', hot:true,
      logo:'Z', logoColor:'#26a69a',
    },
    {
      id:'j2', title:'ML Research Intern',
      company:'Flipkart', location:'Remote',
      stipend:'₹30,000/mo', duration:'6 months',
      tags:['Python','PyTorch','LLMs'],
      applicants:398, posted:'3 days ago', hot:true,
      logo:'F', logoColor:'#2962ff',
    },
    {
      id:'j3', title:'Product Design Intern',
      company:'CRED', location:'Bengaluru',
      stipend:'₹20,000/mo', duration:'3 months',
      tags:['Figma','UX Research','Prototyping'],
      applicants:87, posted:'5 days ago', hot:false,
      logo:'C', logoColor:'#7c3aed',
    },
    {
      id:'j4', title:'Data Analyst Intern',
      company:'Groww', location:'Remote',
      stipend:'₹18,000/mo', duration:'2 months',
      tags:['SQL','Python','Tableau'],
      applicants:203, posted:'1 week ago', hot:false,
      logo:'G', logoColor:'#f59e0b',
    },
  ],
  normal:[
    {
      id:'j5', title:'Senior Frontend Engineer',
      company:'Razorpay', location:'Bengaluru',
      salary:'₹32–45 LPA', exp:'4–7 years',
      tags:['React','Node.js','System Design'],
      applicants:78, posted:'2 days ago', hot:true,
      logo:'R', logoColor:'#2962ff',
    },
    {
      id:'j6', title:'Product Manager – Fintech',
      company:'PhonePe', location:'Bengaluru (Hybrid)',
      salary:'₹40–55 LPA', exp:'5–9 years',
      tags:['Product Strategy','Data Analysis','B2C'],
      applicants:156, posted:'1 day ago', hot:true,
      logo:'P', logoColor:'#7c3aed',
    },
    {
      id:'j7', title:'DevOps / SRE',
      company:'Swiggy', location:'Bengaluru',
      salary:'₹28–40 LPA', exp:'3–6 years',
      tags:['Kubernetes','AWS','Terraform'],
      applicants:64, posted:'4 days ago', hot:false,
      logo:'S', logoColor:'#ef5350',
    },
    {
      id:'j8', title:'Machine Learning Engineer',
      company:'Meesho', location:'Remote',
      salary:'₹35–50 LPA', exp:'3–5 years',
      tags:['Python','TensorFlow','MLOps'],
      applicants:189, posted:'3 days ago', hot:false,
      logo:'M', logoColor:'#26a69a',
    },
  ],
  senior:[
    {
      id:'j9', title:'Chief Technology Officer',
      company:'FinTrust Ventures', location:'Mumbai',
      salary:'₹1.2–2 Cr CTC', exp:'20+ years',
      tags:['Leadership','Architecture','Fintech'],
      applicants:12, posted:'1 week ago', hot:true,
      logo:'FT', logoColor:'#26a69a',
    },
    {
      id:'j10', title:'Independent Board Director – Tech',
      company:'Nykaa', location:'Remote / Board Meetings',
      salary:'Board Compensation', exp:'15+ years',
      tags:['Governance','Strategy','Digital Transformation'],
      applicants:8, posted:'2 weeks ago', hot:false,
      logo:'N', logoColor:'#ef5350',
    },
    {
      id:'j11', title:'Technical Advisor / Mentor',
      company:'Startup India Hub', location:'Flexible',
      salary:'Equity + Honorarium', exp:'10+ years',
      tags:['Mentorship','Advisory','Early Stage'],
      applicants:34, posted:'5 days ago', hot:true,
      logo:'SI', logoColor:'#f59e0b',
    },
    {
      id:'j12', title:'VP Engineering (Part-time)',
      company:'TechBridge NGO', location:'Remote',
      salary:'₹8–12 LPA (Part Time)', exp:'12+ years',
      tags:['Engineering Leadership','Nonproft','EdTech'],
      applicants:19, posted:'3 days ago', hot:false,
      logo:'TB', logoColor:'#2962ff',
    },
  ],
};

// ── CONNECTIONS / NETWORK ─────────────────────────────────────────
export const suggestedConnections = [
  { id:'c1', name:'Ananya Krishnan', headline:'SWE @ Amazon | DSA Coach', initials:'AK', color:'#2962ff', mutual:8 },
  { id:'c2', name:'Vikram Patel', headline:'Quant Researcher | Ex-Goldman Sachs', initials:'VP', color:'#26a69a', mutual:3 },
  { id:'c3', name:'Meera Iyer', headline:'Founder @ EdTech Startup | YC W23', initials:'MI', color:'#7c3aed', mutual:12 },
  { id:'c4', name:'Suresh Babu', headline:'Retired ISRO Scientist | Consulting', initials:'SB', color:'#f59e0b', mutual:5 },
  { id:'c5', name:'Riya Singh', headline:'Product Intern @ Naukri | MBA 2026', initials:'RS', color:'#ef5350', mutual:2 },
];

// ── MARKET MINI STATS ─────────────────────────────────────────────
export const marketStats = [
  { label:'Jobs Posted Today', value:'2,847', change:'+12%', up:true },
  { label:'Active Recruiters', value:'14,320', change:'+5.2%', up:true },
  { label:'Internships Open', value:'826', change:'+28%', up:true },
  { label:'Senior Roles', value:'243', change:'-3%', up:false },
];

// ── NOTIFICATIONS ─────────────────────────────────────────────────
export const notifications = [
  { id:'n1', text:'Priya Mehta viewed your profile', time:'5m', type:'view' },
  { id:'n2', text:'New job match: Senior Frontend Engineer @ Razorpay', time:'1h', type:'job' },
  { id:'n3', text:'Rahul Verma accepted your connection', time:'3h', type:'connect' },
  { id:'n4', text:'You have 3 unread messages', time:'5h', type:'message' },
];
