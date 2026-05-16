import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  description?: string;
  coverImage?: string;
  owner: Schema.Types.ObjectId;
  collaborators: Array<{
    user: Schema.Types.ObjectId;
    role: 'viewer' | 'editor' | 'admin';
  }>;
  isPublic: boolean;
  places: Schema.Types.ObjectId[];
  tags: string[];
  comments: Array<{
    user: Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
  }>;
  stats: {
    totalPlaces: number;
    visited: number;
    planned: number;
    wantToVisit: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  coverImage: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['viewer', 'editor', 'admin'],
        default: 'editor',
      },
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    },
  ],
  tags: [String],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  stats: {
    totalPlaces: { type: Number, default: 0 },
    visited: { type: Number, default: 0 },
    planned: { type: Number, default: 0 },
    wantToVisit: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CollectionSchema.index({ owner: 1 });
CollectionSchema.index({ isPublic: 1 });

export default mongoose.models.Collection ||
  mongoose.model<ICollection>('Collection', CollectionSchema);
