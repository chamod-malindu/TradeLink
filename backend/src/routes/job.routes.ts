import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobStatus,
  deleteJob,
} from '../controllers/job.controller';

const router = Router();

// GET  /api/jobs        — list all jobs (supports ?category= and ?status= filters)
router.get('/', getAllJobs);

// GET  /api/jobs/:id    — fetch a single job by ID
router.get('/:id', getJobById);

// POST /api/jobs        — create a new job request
router.post('/', createJob);

// PATCH /api/jobs/:id   — update status only
router.patch('/:id', updateJobStatus);

// DELETE /api/jobs/:id  — delete a job request
router.delete('/:id', deleteJob);

export default router;
