# CareerBridge 🚀

> An inclusive professional networking & job portal platform — built for Interns, Professionals, and Senior Citizens (55+).

🚀 **Live Demo:** [https://careerbridge-eosin.vercel.app](https://careerbridge-eosin.vercel.app)

![CareerBridge](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![CSS](https://img.shields.io/badge/Vanilla-CSS-1572b6?style=for-the-badge&logo=css3)

---

## 📌 About

CareerBridge is a full-stack LinkedIn-style platform built as a **Frontend Engineering Technology** project. It features:

- **3 User Modes** — Internship, Professional, Senior 55+
- **Job Seeker Side** — Browse & apply for jobs posted by recruiters
- **Recruiter Portal** — Post jobs, manage listings, review applicants
- **Real API Integration** — Frontend ↔ Express backend with live data sync

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| State Management | React Context API |
| Styling | Vanilla CSS (CSS Grid, Flexbox, Animations) |
| Icons | Lucide React |
| Backend | Node.js + Express.js |
| Data Store | In-Memory JavaScript Arrays |
| Build Tool | Vite (with API Proxy) |

---

## 📁 Project Structure

```
CareerBridge/
├── server/                  ← Express.js Backend (port 5001)
│   ├── index.js             ← Server entry point
│   ├── db.js                ← In-memory data store
│   └── routes/
│       ├── jobs.js          ← CRUD for job postings
│       └── applications.js  ← CRUD for applications
│
└── src/                     ← React Frontend (port 5173)
    ├── main.jsx             ← Root + Role Gate
    ├── App.jsx              ← Job Seeker Shell
    ├── RoleSelect.jsx       ← Landing Screen
    ├── context/             ← Global State (AppContext)
    ├── pages/               ← Feed, Jobs, Network, Messages, Profile
    └── recruiter/           ← Recruiter Portal Pages
```

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+ installed
- npm installed

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/classaxar/careerbridge.git
cd careerbridge

# 2. Install dependencies
npm install

# 3. Start the backend server (Terminal 1)
npm run server
# → API running at http://localhost:5001

# 4. Start the frontend dev server (Terminal 2)
npm run dev
# → App running at http://localhost:5173
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start React frontend (Vite) |
| `npm run server` | Start Express backend |
| `npm run build` | Build production bundle |

---

## 📄 Pages

### Job Seeker Side
| Page | Description |
|---|---|
| **Feed** | Home feed with posts, like/save, trending panel |
| **Jobs** | Live job listings fetched from API, apply modal |
| **Network** | Connection suggestions, leaderboard, communities |
| **Messages** | Real-time chat simulation |
| **Profile** | Full profile with skills, experience, certifications |

### Recruiter Portal
| Page | Description |
|---|---|
| **Dashboard** | Stats overview (jobs posted, applicants, shortlisted) |
| **Post a Job** | Full form to create job listings via API |
| **Manage Jobs** | Table view with pause/activate/delete actions |
| **Applicants** | Review and update application status |

---

## 🔌 API Endpoints

```
GET    /api/jobs                  → List all jobs (filter by type, recruiterId)
POST   /api/jobs                  → Create new job posting
PUT    /api/jobs/:id              → Update job (status, fields)
DELETE /api/jobs/:id              → Delete a job

GET    /api/applications          → List applications (filter by jobId, status)
POST   /api/applications          → Submit job application
PATCH  /api/applications/:id      → Update application status
```

---

## ✨ Features Demonstrated

- ✅ React Hooks — `useState`, `useEffect`, `useContext`, `useCallback`
- ✅ React Context API for global state management
- ✅ REST API integration with `fetch` (GET, POST, PUT, PATCH, DELETE)
- ✅ Async/await with error handling
- ✅ CSS Grid & Flexbox responsive layouts
- ✅ CSS Custom Properties (design token system)
- ✅ CSS Keyframe Animations & Transitions
- ✅ Glassmorphism UI (backdrop-filter: blur)
- ✅ Role-based routing (Job Seeker vs Recruiter)
- ✅ CORS configuration between frontend and backend

---

## 📸 Screenshots

> Role Select → Job Seeker Feed → Jobs Page → Recruiter Dashboard → Applicants

---

## 👤 Author

**Akshar Modi** — Frontend Engineering Technology Project, 2025–2026

---

## 📝 License

This project is for educational purposes.
