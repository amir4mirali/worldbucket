export type PlaceType = 'city' | 'restaurant' | 'landmark' | 'hidden_spot' | 'custom' | 'country';
export type PlaceStatus = 'want_to_visit' | 'planned' | 'visited';
export type Priority = 'low' | 'medium' | 'high';
export type CollaboratorRole = 'viewer' | 'editor' | 'admin';
export type NotificationType = 'collaboration_invite' | 'place_added' | 'comment' | 'like' | 'follow';

export interface IPlace {
  _id: string;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  country: string;
  city?: string;
  address?: string;
  placeType: PlaceType;
  tags: string[];
  priority: Priority;
  rating?: number;
  status: PlaceStatus;
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
  createdBy: string;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICollection {
  _id: string;
  name: string;
  description?: string;
  coverImage?: string;
  owner: string;
  collaborators: Array<{
    user: string;
    role: CollaboratorRole;
  }>;
  isPublic: boolean;
  places: string[];
  tags: string[];
  comments: Array<{
    user: string;
    text: string;
    createdAt: string;
  }>;
  stats: {
    totalPlaces: number;
    visited: number;
    planned: number;
    wantToVisit: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  isPublic: boolean;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
}

export interface INotification {
  _id: string;
  user: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: {
    collectionId?: string;
    placeId?: string;
    userId?: string;
  };
  read: boolean;
  createdAt: string;
}
