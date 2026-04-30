import { applications, jobs } from '../db.js';
import { v4 as uuid } from 'uuid';
import express from 'express';

const router = express.Router();

// GET /api/applications?jobId=&recruiterId=
router.get('/', (req, res) => {
  const { jobId, recruiterId, status } = req.query;
  let result = applications;
  if (jobId) result = result.filter(a => a.jobId === jobId);
  if (recruiterId) result = result.filter(a => a.recruiterId === recruiterId);
  if (status) result = result.filter(a => a.status === status);
  // Enrich with job title
  const enriched = result.map(a => ({
    ...a,
    jobTitle: jobs.find(j => j.id === a.jobId)?.title || 'Unknown',
    company: jobs.find(j => j.id === a.jobId)?.company || '',
  }));
  res.json({ success: true, data: enriched });
});

// POST /api/applications — submit application
router.post('/', (req, res) => {
  const { jobId, name, email, portfolio, coverNote } = req.body;
  if (!jobId || !name || !email) {
    return res.status(400).json({ success: false, message: 'jobId, name, email are required' });
  }
  const job = jobs.find(j => j.id === jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

  const newApp = {
    id: uuid(),
    jobId,
    recruiterId: job.recruiterId,
    name, email,
    portfolio: portfolio || '',
    coverNote: coverNote || '',
    status: 'pending',
    appliedAt: new Date().toISOString(),
  };
  applications.push(newApp);
  // Increment applicant count
  job.applicants = (job.applicants || 0) + 1;
  res.status(201).json({ success: true, data: newApp });
});

// PATCH /api/applications/:id — update status
router.patch('/:id', (req, res) => {
  const idx = applications.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Application not found' });
  const { status } = req.body;
  if (!['pending', 'shortlisted', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  applications[idx].status = status;
  res.json({ success: true, data: applications[idx] });
});

export default router;
