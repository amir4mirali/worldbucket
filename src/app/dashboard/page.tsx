'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections');
      const data = await response.json();
      setCollections(data.data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Your Collections
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Create and manage your travel collections
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-5 w-5" />
            New Collection
          </Button>
        </div>

        {/* Collections Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : collections.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(collections as any).map((collection: any) => (
              <Card key={collection._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {collection.coverImage && (
                  <div className="h-32 w-full bg-gradient-to-br from-blue-400 to-purple-500">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-1">{collection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex gap-4 mt-4 text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      {collection.stats.totalPlaces} places
                    </span>
                    {collection.collaborators.length > 0 && (
                      <span className="text-slate-600 dark:text-slate-400">
                        {collection.collaborators.length} collaborators
                      </span>
                    )}
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
                  No collections yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Create your first collection to start saving places
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </ProtectedRoute>
  );
}
