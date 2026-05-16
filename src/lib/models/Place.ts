import mongoose, { Schema, Document } from 'mongoose';

export interface IPlace extends Document {
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  country: string;
  city?: string;
  address?: string;
  placeType: 'city' | 'restaurant' | 'landmark' | 'hidden_spot' | 'custom' | 'country';
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  rating?: number;
  status: 'want_to_visit' | 'planned' | 'visited';
  budget?: {
    currency: string;
    amount: number;
  };
  bestSeason?: string[];
  images: string[];
  videos?: string[];
  urls?: {
    youtube?: string[];
    instagram?: string[];
    tiktok?: string[];
    external?: string[];
  };
  notes?: string;
  createdBy: Schema.Types.ObjectId;
  collection: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: String,
  address: String,
  placeType: {
    type: String,
    enum: ['city', 'restaurant', 'landmark', 'hidden_spot', 'custom', 'country'],
    default: 'custom',
  },
  tags: [String],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  status: {
    type: String,
    enum: ['want_to_visit', 'planned', 'visited'],
    default: 'want_to_visit',
  },
  budget: {
    currency: String,
    amount: Number,
  },
  bestSeason: [String],
  images: [String],
  videos: [String],
  urls: {
    youtube: [String],
    instagram: [String],
    tiktok: [String],
    external: [String],
  },
  notes: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collection: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
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

PlaceSchema.index({ latitude: 1, longitude: 1 });
PlaceSchema.index({ collection: 1 });

export default mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);
