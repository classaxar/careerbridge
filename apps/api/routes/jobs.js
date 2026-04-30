import { jobs } from '../db.js';
import { v4 as uuid } from 'uuid';
import express from 'express';

const router = express.Router();

// GET /api/jobs — all jobs, optional ?type= filter
router.get('/', (req, res) => {
  const { type, recruiterId } = req.query;
  let result = jobs;
  if (type) result = result.filter(j => j.type === type);
  if (recruiterId) result = result.filter(j => j.recruiterId === recruiterId);
  res.json({ success: true, data: result });
});

// GET /api/jobs/:id — single job
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, data: job });
});

// POST /api/jobs — create job
router.post('/', (req, res) => {
  const {
    title, company, location, type, stipend, salary,
    duration, experience, description, tags, recruiterId,
    logo, logoColor, hot
  } = req.body;

  if (!title || !company || !type) {
    return res.status(400).json({ success: false, message: 'title, company, and type are required' });
  }

  const newJob = {
    id: uuid(),
    recruiterId: recruiterId || 'r1',
    title, company, location: location || 'India',
    type, stipend: stipend || '', salary: salary || '',
    duration: duration || '', experience: experience || '',
    description: description || '',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
    status: 'active',
    hot: hot || false,
    applicants: 0,
    posted: new Date().toISOString(),
    logo: logo || company.charAt(0).toUpperCase(),
    logoColor: logoColor || '#26a69a',
  };

  jobs.push(newJob);
  res.status(201).json({ success: true, data: newJob });
});

// PUT /api/jobs/:id — update job
router.put('/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });

  const updated = { ...jobs[idx], ...req.body, id: jobs[idx].id };
  jobs[idx] = updated;
  res.json({ success: true, data: updated });
});

// DELETE /api/jobs/:id — delete job
router.delete('/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
  jobs.splice(idx, 1);
  res.json({ success: true, message: 'Job deleted' });
});

export default router;
