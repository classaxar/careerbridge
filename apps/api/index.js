import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5001;

// ── Security Middleware ──────────────────────────────────────────
// Helmet sets secure HTTP headers
app.use(helmet());

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter); // apply to all API routes

// CORS configuration (strict)
// Update this later when frontend domain is ready
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// ── Request Logger ──────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'secure_and_running',
    timestamp: new Date().toISOString(),
    message: 'CareerBridge API v2 is online.'
  });
});

// ── 404 ─────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Secure CareerBridge API running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
