'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IUser, ICollection } from '@/types';
import { MapPin } from 'lucide-react';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [params.username]);

  const fetchUserProfile = async () => {
    try {
      const userResponse = await fetch(`/api/users/${params.username}`);
      const userData = await userResponse.json();

      if (userData.success) {
        setUser(userData.data);

        // Fetch user's collections
        const collectionsResponse = await fetch(`/api/collections?userId=${userData.data._id}`);
        const collectionsData = await collectionsResponse.json();
        setCollections(collectionsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-slate-600 dark:text-slate-400">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={user.name}
                className="h-24 w-24 rounded-full"
              />

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">@{user.username}</p>

                {user.bio && (
                  <p className="text-slate-600 dark:text-slate-400 mt-2">{user.bio}</p>
                )}

                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Followers</p>
                    <p className="text-xl font-semibold">{user.followers.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Following</p>
                    <p className="text-xl font-semibold">{user.following.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Collections</p>
                    <p className="text-xl font-semibold">{collections.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collections */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Travel Collections
          </h2>

          {collections.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Card key={collection._id}>
                  {collection.coverImage && (
                    <div className="h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500">
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
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="h-4 w-4" />
                      {collection.stats.totalPlaces} places
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12">
                <div className="text-center">
                  <p className="text-slate-600 dark:text-slate-400">No public collections yet</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
