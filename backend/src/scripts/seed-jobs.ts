import dotenv from 'dotenv';
import mongoose from 'mongoose';
import JobRequest from '../models/jobRequest.model';

dotenv.config();

const SAMPLE_JOBS = [
  {
    title: 'Leaking kitchen tap',
    description:
      'Kitchen tap has been dripping for a week. Need a plumber to repair or replace the washer in Glasgow.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'Sarah Mitchell',
    contactEmail: 'sarah.mitchell@example.com',
    status: 'Open' as const,
  },
  {
    title: 'Fuse box keeps tripping',
    description:
      'Power cuts out when the oven and kettle run together. Looking for a qualified electrician in Edinburgh.',
    category: 'Electrical',
    location: 'Edinburgh',
    contactName: 'James Reid',
    contactEmail: 'james.reid@example.com',
    status: 'In Progress' as const,
  },
  {
    title: 'Living room repaint',
    description:
      'Two walls need repainting after minor water damage. Walls are prepped; paint and materials can be supplied.',
    category: 'Painting',
    location: 'Aberdeen',
    contactName: 'Emma Fraser',
    contactEmail: 'emma.fraser@example.com',
    status: 'Open' as const,
  },
  {
    title: 'Custom bookshelf installation',
    description:
      'Flat-pack bookshelf needs assembly and fixing to the wall in a home office in Dundee.',
    category: 'Joinery',
    location: 'Dundee',
    contactName: 'David Campbell',
    contactEmail: 'david.campbell@example.com',
    status: 'Closed' as const,
  },
  {
    title: 'Blocked bathroom drain',
    description:
      'Shower drain is slow and backing up. Urgent plumbing help needed in Paisley.',
    category: 'Plumbing',
    location: 'Paisley',
    contactName: 'Lisa O\'Connor',
    contactEmail: 'lisa.oconnor@example.com',
    status: 'Open' as const,
  },
  {
    title: 'Outdoor socket installation',
    description:
      'Need a weatherproof outdoor socket fitted for garden tools. Property in Stirling.',
    category: 'Electrical',
    location: 'Stirling',
    contactName: 'Mark Hughes',
    contactEmail: 'mark.hughes@example.com',
    status: 'Open' as const,
  },
  {
    title: 'Fence panel replacement',
    description:
      'Two fence panels blown down in recent wind. Looking for general handyman or joiner in Inverness.',
    category: 'General',
    location: 'Inverness',
    contactName: 'Rachel Grant',
    contactEmail: 'rachel.grant@example.com',
    status: 'In Progress' as const,
  },
  {
    title: 'Hallway and stairs painting',
    description:
      'Hall, stairs and landing need full repaint. Ceilings already done; walls and woodwork remain.',
    category: 'Painting',
    location: 'Glasgow',
    contactName: 'Tom Brennan',
    contactEmail: 'tom.brennan@example.com',
    status: 'Open' as const,
  },
];

const seedJobs = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const existingCount = await JobRequest.countDocuments();
    if (existingCount > 0) {
      console.log(
        `Database already has ${existingCount} job(s). Skipping seed to avoid duplicates.`
      );
      console.log('To re-seed, delete jobs from MongoDB first, then run npm run seed again.');
    } else {
      const created = await JobRequest.insertMany(SAMPLE_JOBS);
      console.log(`Seeded ${created.length} sample job requests successfully.`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedJobs();
