import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user: Schema.Types.ObjectId;
  type: 'collaboration_invite' | 'place_added' | 'comment' | 'like' | 'follow';
  title: string;
  message: string;
  data?: {
    collectionId?: Schema.Types.ObjectId;
    placeId?: Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
  };
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['collaboration_invite', 'place_added', 'comment', 'like', 'follow'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    collectionId: Schema.Types.ObjectId,
    placeId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema);
