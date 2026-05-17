import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface — defines the shape of a JobRequest document
export interface IJobRequest extends Document {
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}

const jobRequestSchema = new Schema<IJobRequest>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'General'],
        message: '{VALUE} is not a valid category',
      },
      default: 'General',
    },
    location: {
      type: String,
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Indexes for faster filtered queries
jobRequestSchema.index({ status: 1 });
jobRequestSchema.index({ category: 1 });
jobRequestSchema.index({ createdAt: -1 });

export default mongoose.model<IJobRequest>(
  'JobRequest',
  jobRequestSchema,
  'jobRequests'
);
