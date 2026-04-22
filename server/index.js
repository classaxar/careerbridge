import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs.js';
import applicationsRouter from './routes/applications.js';

const app = express();
const PORT = 5001;

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

// ── Request Logger ──────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──────────────────────────────────────────────────────
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

// ── Health Check ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'NexusNet API is running 🚀', time: new Date().toISOString() });
});

// ── 404 ─────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 NexusNet API running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Jobs:   http://localhost:${PORT}/api/jobs`);
  console.log(`   Apps:   http://localhost:${PORT}/api/applications\n`);
});
