import mongoose, { Schema, Document } from 'mongoose';

export interface ICollaborationInvite extends Document {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId | string; // string for email invites
  collectionId: Schema.Types.ObjectId;
  role: 'viewer' | 'editor' | 'admin';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  expiresAt: Date;
}

const CollaborationInviteSchema = new Schema<ICollaborationInvite>({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.Mixed,
    required: true, // Can be user ID or email
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },
  role: {
    type: String,
    enum: ['viewer', 'editor', 'admin'],
    default: 'editor',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  },
});

export default mongoose.models.CollaborationInvite ||
  mongoose.model<ICollaborationInvite>('CollaborationInvite', CollaborationInviteSchema);
