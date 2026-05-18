'use client';

import { useState, useEffect, useCallback } from 'react';
import { getJobs } from '@/lib/api';
import JobCard from '@/components/JobCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'General'];

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: Record<string, string> = {};
      if (category) params.category = category;
      if (status) params.status = status;
      if (search.trim()) params.search = search.trim();

      const res = await getJobs(params);
      if (res.success) setJobs(res.data);
    } catch {
      setError(
        'Could not load jobs. Please ensure the backend API is reachable.'
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [category, status, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchJobs, search ? 400 : 0);
    return () => clearTimeout(timeout);
  }, [fetchJobs, search]);

  return (
    <div className="space-y-6">
      {/* page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
        <p className="text-muted-foreground mt-1">
          Browse open jobs or post your own service request.
        </p>
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

          <Select value={category} onValueChange={(val) => setCategory(!val || val === 'all' ? '' : val)}>
            <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(val) => setStatus(!val || val === 'all' ? '' : val)}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* job listing */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No jobs found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
