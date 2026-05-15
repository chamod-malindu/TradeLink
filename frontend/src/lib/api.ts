import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Fetch all jobs with optional query filters */
export async function getJobs(params?: {
  category?: string;
  status?: string;
  search?: string;
}) {
  const { data } = await api.get('/jobs', { params });
  return data;
}

/** Fetch a single job by its ID */
export async function getJobById(id: string) {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
}

/** Submit a new job request */
export async function createJob(payload: {
  title: string;
  description: string;
  category: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
}) {
  const { data } = await api.post('/jobs', payload);
  return data;
}

/** Update the status of a job */
export async function updateJobStatus(id: string, status: string) {
  const { data } = await api.patch(`/jobs/${id}`, { status });
  return data;
}

/** Delete a job by its ID */
export async function deleteJob(id: string) {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
}
