# CareerBridge 🚀

> An inclusive professional networking & job portal platform — built for Interns, Professionals, and Senior Citizens (55+).

🚀 **Live Demo:** [https://careerbridge-eosin.vercel.app](https://careerbridge-eosin.vercel.app)

![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Monorepo](https://img.shields.io/badge/NPM-Workspaces-cb3837?style=for-the-badge&logo=npm)

---

## 📌 About

CareerBridge is a full-stack LinkedIn-style platform built as a **Frontend Engineering Technology** project. It has been refactored into a scalable Monorepo architecture. It features:

- **3 User Modes** — Internship, Professional, Senior 55+
- **Job Seeker App** — Browse & apply for jobs, network, and engage with the feed.
- **Employer/Recruiter Portal** — An isolated B2B dashboard to post jobs, manage listings, and review applicants.
- **API Integration** — Frontend ↔ Express backend with live data sync.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Architecture | NPM Workspaces (Monorepo) |
| Frontend | React 19 + Vite |
| State Management | React Context API |
| Styling | Vanilla CSS (Glassmorphism, CSS Grid, Flexbox) |
| Icons | Lucide React |
| Backend | Node.js + Express.js |
| Data Store | In-Memory Data (MongoDB migration planned) |

---

## 📁 Project Structure

This project uses **NPM Workspaces** to manage three distinct applications within a single repository:

```
CareerBridge/
├── package.json             ← Root config (concurrently script)
├── apps/
│   ├── api/                 ← Node.js/Express Backend (Port 5001)
│   ├── seeker/              ← Job Seeker React Frontend (Port 5173)
│   └── recruiter/           ← Employer/Recruiter React Frontend (Port 5174)
```

**Key Architectural Decisions:**
- **Strict Isolation:** The Seeker and Recruiter experiences are completely decoupled into their own Vite applications, sharing no frontend code.
- **Unified Workflow:** `concurrently` is used at the root to boot all three servers simultaneously.

---

## 💻 How to Run Locally

### Prerequisites
- Node.js 18+ installed
- npm installed

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/classaxar/careerbridge.git
cd careerbridge

# 2. Install dependencies across the entire monorepo
npm install

# 3. Start the entire stack (API, Seeker App, Recruiter App)
npm run dev
```

### Access Points
- **API Health:** `http://localhost:5001/api/health`
- **Job Seeker App:** `http://localhost:5173` (Starts at Startup Landing Page)
- **Employer Portal:** `http://localhost:5174` (Starts at B2B Auth Wall)

---

## 📄 Core Features

### Job Seeker Side (Port 5173)
- **Guest Mode:** Browse jobs freely without logging in. Authentication is intercepted only upon attempting to apply or save.
- **Premium Auth UI:** Split-pane glassmorphism design with Google/Apple SSO buttons.
- **Feed:** Home feed with posts, like/save, trending panel.
- **Network:** Connection suggestions, leaderboard, and dynamic communities.
- **Mobile Responsiveness:** Advanced native-app style bottom navigation bar on mobile.

### Recruiter Portal (Port 5174)
- **B2B Auth Wall:** Secure, isolated login for employers.
- **Dashboard:** Stats overview (jobs posted, applicants, shortlisted).
- **Manage Jobs:** Table view with pause/activate/delete actions.
- **Applicants Pipeline:** Review and update application status.

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

## 👤 Author

**Akshar Modi** — Frontend Engineering Technology Project, 2025–2026

---

## 📝 License

This project is for educational purposes.
