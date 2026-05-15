import { Request, Response } from 'express';
import mongoose from 'mongoose';
import JobRequest from '../models/jobRequest.model';

/**
 * Create a new job request.
 * Route: POST /api/jobs
 */
export const createJob = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    } = req.body;

    // validate required fields
    const errors: string[] = [];
    if (!title || !title.trim()) errors.push('Title is required');
    if (!description || !description.trim())
      errors.push('Description is required');
    if (contactEmail && !/^\S+@\S+\.\S+$/.test(contactEmail)) {
      errors.push('Please enter a valid email address');
    }

    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    const job = await JobRequest.create({
      title: title.trim(),
      description: description.trim(),
      category,
      location,
      contactName,
      contactEmail,
    });

    res
      .status(201)
      .json({ success: true, data: job, message: 'Job created successfully' });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(
        (e: any) => e.message
      );
      res.status(400).json({ success: false, errors: messages });
      return;
    }
    console.error('Create job error:', error);
    res.status(500).json({ success: false, error: 'Failed to create job' });
  }
};

/**
 * Retrieve all jobs. Supports optional query filters:
 *   ?category=Plumbing  — filter by category
 *   ?status=Open        — filter by status
 *   ?search=keyword     — search in title and description
 * Route: GET /api/jobs
 */
export const getAllJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, status, search } = req.query;

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    // keyword search across title and description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: jobs, count: jobs.length });
  } catch (error) {
    console.error('Get all jobs error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch jobs' });
  }
};

/**
 * Retrieve a single job by its ID.
 * Route: GET /api/jobs/:id
 */
export const getJobById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch job' });
  }
};

/**
 * Update the status of a job request.
 * Only the status field can be modified via this endpoint.
 * Route: PATCH /api/jobs/:id
 */
export const updateJobStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;

    if (!status || !['Open', 'In Progress', 'Closed'].includes(status)) {
      res.status(400).json({
        success: false,
        error: 'Invalid status. Must be Open, In Progress, or Closed.',
      });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: job, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ success: false, error: 'Failed to update job' });
  }
};

/**
 * Delete a job request by its ID.
 * Route: DELETE /api/jobs/:id
 */
export const deleteJob = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: null, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete job' });
  }
};
