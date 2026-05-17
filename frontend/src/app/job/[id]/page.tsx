'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById, updateJobStatus, deleteJob } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Mail,
  Loader2,
  Trash2,
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  Open: 'default',
  'In Progress': 'secondary',
  Closed: 'outline',
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadError('');
      try {
        const res = await getJobById(id as string);
        if (res.success) setJob(res.data);
        else setLoadError('Job not found.');
      } catch {
        setLoadError('Could not load this job. Check that the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    setActionError('');
    try {
      const res = await updateJobStatus(id as string, newStatus);
      if (res.success) {
        setJob((prev) => (prev ? { ...prev, status: newStatus as Job['status'] } : prev));
      } else {
        setActionError(res.error || 'Failed to update status.');
      }
    } catch {
      setActionError('Could not update status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    setDeleting(true);
    setActionError('');
    try {
      const res = await deleteJob(id as string);
      if (res.success) router.push('/');
      else {
        setActionError(res.error || 'Failed to delete job.');
        setDeleting(false);
      }
    } catch {
      setActionError('Could not delete job. Please try again.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">
          {loadError || 'Job not found.'}
        </p>
        <Link href="/">
          <Button variant="outline">Back to listings</Button>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </Link>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <Badge variant="outline">{job.category}</Badge>
                {job.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
              </div>
            </div>
            <Badge variant={statusVariant[job.status]} className="text-sm shrink-0">
              {job.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {job.description}
            </p>
          </div>

          <Separator />

          {/* contact info */}
          <div>
            <h3 className="text-sm font-medium mb-3">Contact Details</h3>
            <div className="space-y-2 text-sm">
              {job.contactName && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  {job.contactName}
                </div>
              )}
              {job.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {job.contactEmail}
                  </a>
                </div>
              )}
              {!job.contactName && !job.contactEmail && (
                <p className="text-muted-foreground">No contact details provided.</p>
              )}
            </div>
          </div>

          <Separator />

          {actionError && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {actionError}
            </div>
          )}

          {/* actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Update Status:</span>
              <Select
                value={job.status}
                onValueChange={handleStatusChange}
                disabled={updating}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
