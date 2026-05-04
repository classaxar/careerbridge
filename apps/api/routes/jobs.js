import { jobs as mockJobs } from '../db.js';
import Job from '../models/Job.js';
import { v4 as uuid } from 'uuid';
import express from 'express';

const router = express.Router();

const useDb = () => !!process.env.MONGO_URI;

// GET /api/jobs — all jobs, optional ?type= filter
router.get('/', async (req, res) => {
  try {
    const { type, recruiterId } = req.query;
    
    if (useDb()) {
      const query = {};
      if (type) query.type = type;
      if (recruiterId) query.recruiterId = recruiterId;
      const dbJobs = await Job.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, data: dbJobs });
    }

    let result = mockJobs;
    if (type) result = result.filter(j => j.type === type);
    if (recruiterId) result = result.filter(j => j.recruiterId === recruiterId);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/jobs/:id — single job
router.get('/:id', async (req, res) => {
  try {
    if (useDb()) {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
      return res.json({ success: true, data: job });
    }

    const job = mockJobs.find(j => j.id === req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/jobs — create job
router.post('/', async (req, res) => {
  try {
    if (useDb()) {
      const job = new Job({ ...req.body, recruiterId: req.body.recruiterId || 'r1' });
      await job.save();
      return res.status(201).json({ success: true, data: job });
    }

    const newJob = {
      id: uuid(),
      ...req.body,
      recruiterId: req.body.recruiterId || 'r1',
      status: 'active',
      applicants: 0,
      posted: new Date().toISOString(),
    };
    mockJobs.push(newJob);
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/jobs/:id — update job
router.put('/:id', async (req, res) => {
  try {
    if (useDb()) {
      const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
      return res.json({ success: true, data: job });
    }

    const idx = mockJobs.findIndex(j => j.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
    const updated = { ...mockJobs[idx], ...req.body, id: mockJobs[idx].id };
    mockJobs[idx] = updated;
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/jobs/:id — delete job
router.delete('/:id', async (req, res) => {
  try {
    if (useDb()) {
      const job = await Job.findByIdAndDelete(req.params.id);
      if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
      return res.json({ success: true, message: 'Job deleted' });
    }

    const idx = mockJobs.findIndex(j => j.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
    mockJobs.splice(idx, 1);
    res.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
