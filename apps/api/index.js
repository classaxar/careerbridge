import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs.js';
import applicationsRouter from './routes/applications.js';

const app = express();
const PORT = 5001;

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
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
  res.json({ success: true, message: 'CareerBridge API is running 🚀', time: new Date().toISOString() });
});

// ── Root Route ──────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.send('Welcome to the CareerBridge API! Navigate to /api/health to check status.');
});

// ── 404 ─────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Start ────────────────────────────────────────────────────────
// Only listen if run directly (not via Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 CareerBridge API running at http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Jobs:   http://localhost:${PORT}/api/jobs`);
    console.log(`   Apps:   http://localhost:${PORT}/api/applications\n`);
  });
}

// Export for Vercel Serverless
export default app;
