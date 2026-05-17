import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app';
import JobRequest from '../models/jobRequest.model';

dotenv.config();

const getTestUri = (): string => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is required to run API tests');
  }
  if (uri.includes('?')) {
    return uri.replace(/\?.*$/, (match) => `/tradelink_test${match}`);
  }
  const parts = uri.split('/');
  parts[parts.length - 1] = 'tradelink_test';
  return parts.join('/');
};

beforeAll(async () => {
  await mongoose.connect(getTestUri(), { serverSelectionTimeoutMS: 10000 });
}, 15000);

afterEach(async () => {
  await JobRequest.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/jobs', () => {
  it('creates a job with valid data', async () => {
    const response = await request(app)
      .post('/api/jobs')
      .send({
        title: 'Fix leaking tap',
        description: 'Kitchen tap dripping for several days in Glasgow flat.',
        category: 'Plumbing',
        location: 'Glasgow',
        contactEmail: 'homeowner@example.com',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Fix leaking tap');
    expect(response.body.data.status).toBe('Open');
  });

  it('rejects a job without a title', async () => {
    const response = await request(app)
      .post('/api/jobs')
      .send({
        title: '',
        description: 'Valid description for the job request here.',
        category: 'Plumbing',
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});

describe('GET /api/jobs', () => {
  it('returns all jobs', async () => {
    await JobRequest.create({
      title: 'Paint hallway',
      description: 'Hallway needs repainting after minor repairs completed.',
      category: 'Painting',
      location: 'Edinburgh',
    });

    const response = await request(app).get('/api/jobs').expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.count).toBe(1);
  });

  it('filters jobs by category', async () => {
    await JobRequest.insertMany([
      {
        title: 'Plumbing job',
        description: 'Need urgent plumbing help with burst pipe under sink.',
        category: 'Plumbing',
      },
      {
        title: 'Electrical job',
        description: 'Install new light fittings in living room and hallway.',
        category: 'Electrical',
      },
    ]);

    const response = await request(app)
      .get('/api/jobs')
      .query({ category: 'Plumbing' })
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].category).toBe('Plumbing');
  });
});

describe('PATCH /api/jobs/:id', () => {
  it('updates job status', async () => {
    const job = await JobRequest.create({
      title: 'Fence repair',
      description: 'Replace two fence panels damaged in recent storm weather.',
      category: 'General',
    });

    const response = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .send({ status: 'In Progress' })
      .expect(200);

    expect(response.body.data.status).toBe('In Progress');
  });
});
