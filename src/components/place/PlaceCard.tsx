'use client';

import React from 'react';
import { IPlace } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Tag, AlertCircle } from 'lucide-react';

interface PlaceCardProps {
  place: IPlace;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function PlaceCard({ place, onDelete, onEdit }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {place.images.length > 0 && (
        <div className="h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500 relative">
          <img
            src={place.images[0]}
            alt={place.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{place.title}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 mt-1">
              <MapPin className="h-4 w-4" />
              {place.city || place.country}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {place.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {place.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm">
          {place.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{place.rating}/5</span>
            </div>
          )}

          <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium">
            {place.status.replace(/_/g, ' ')}
          </span>
        </div>

        {place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 px-3 py-1 text-sm font-medium rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex-1 px-3 py-1 text-sm font-medium rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
