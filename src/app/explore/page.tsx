'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { ICollection } from '@/types';

export default function ExplorePage() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicMaps();
  }, []);

  const fetchPublicMaps = async () => {
    try {
      const response = await fetch('/api/explore');
      const data = await response.json();
      setCollections(data.data || []);
    } catch (error) {
      console.error('Error fetching public maps:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Explore Public Maps
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Discover travel maps from other travelers around the world
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : collections.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {collection.coverImage && (
                  <div className="h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{collection.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={(collection.owner as any).avatar || '/default-avatar.png'}
                      alt={(collection.owner as any).name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      by {(collection.owner as any).name}
                    </span>
                  </div>

                  {collection.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                      {collection.description}
                    </p>
                  )}

                  <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span>{collection.stats.totalPlaces} places</span>
                    <span>{collection.stats.visited} visited</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No public maps yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Be the first to share your travel dreams
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
