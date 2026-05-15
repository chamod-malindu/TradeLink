'use client';

import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  Open: 'default',
  'In Progress': 'secondary',
  Closed: 'outline',
};

export default function JobCard({ job }: { job: Job }) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/job/${job._id}`} className="block group">
      <Card className="transition-shadow hover:shadow-md h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <Badge variant={statusVariant[job.status] ?? 'outline'}>
              {job.status}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 mt-1">
            {job.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pt-0 text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
          <Badge variant="outline" className="font-normal">
            {job.category}
          </Badge>
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
        </CardFooter>
      </Card>
    </Link>
  );
}
