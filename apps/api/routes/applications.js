import { applications as mockApps, jobs as mockJobs } from '../db.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { v4 as uuid } from 'uuid';
import express from 'express';

const router = express.Router();
const useDb = () => !!process.env.MONGO_URI;

// GET /api/applications?jobId=&recruiterId=
router.get('/', async (req, res) => {
  try {
    const { jobId, recruiterId, status } = req.query;
    
    if (useDb()) {
      const query = {};
      if (jobId) query.jobId = jobId;
      if (status) query.status = status;
      
      // We populate jobId to get title/company, and optionally filter by recruiterId
      let apps = await Application.find(query).populate('jobId', 'title company recruiterId').sort({ createdAt: -1 });
      
      if (recruiterId) {
        apps = apps.filter(a => a.jobId && a.jobId.recruiterId === recruiterId);
      }
      
      const enriched = apps.map(a => ({
        id: a._id,
        ...a.toObject(),
        jobTitle: a.jobId?.title || 'Unknown',
        company: a.jobId?.company || '',
        jobId: a.jobId?._id // keep jobId as string
      }));
      return res.json({ success: true, data: enriched });
    }

    let result = mockApps;
    if (jobId) result = result.filter(a => a.jobId === jobId);
    if (recruiterId) result = result.filter(a => a.recruiterId === recruiterId);
    if (status) result = result.filter(a => a.status === status);
    const enriched = result.map(a => ({
      ...a,
      jobTitle: mockJobs.find(j => j.id === a.jobId)?.title || 'Unknown',
      company: mockJobs.find(j => j.id === a.jobId)?.company || '',
    }));
    res.json({ success: true, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const { jobId, name, email, portfolio, coverNote } = req.body;
    if (!jobId || !name || !email) {
      return res.status(400).json({ success: false, message: 'jobId, name, email are required' });
    }

    if (useDb()) {
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
      
      const newApp = new Application({ jobId, name, email, portfolio, coverNote });
      await newApp.save();
      
      job.applicants += 1;
      await job.save();
      
      return res.status(201).json({ success: true, data: newApp });
    }

    const job = mockJobs.find(j => j.id === jobId);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const newApp = {
      id: uuid(), jobId, recruiterId: job.recruiterId,
      name, email, portfolio: portfolio || '', coverNote: coverNote || '',
      status: 'pending', appliedAt: new Date().toISOString(),
    };
    mockApps.push(newApp);
    job.applicants = (job.applicants || 0) + 1;
    res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/applications/:id
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    if (useDb()) {
      const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
      return res.json({ success: true, data: app });
    }

    const idx = mockApps.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Application not found' });
    mockApps[idx].status = status;
    res.json({ success: true, data: mockApps[idx] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
