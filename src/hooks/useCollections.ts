'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ICollection } from '@/types';

export function useCollections() {
  const { data: session } = useSession();
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchCollections();
    }
  }, [session?.user]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/collections');
      const data = await response.json();

      if (data.success) {
        setCollections(data.data);
      }
    } catch (err) {
      setError('Failed to fetch collections');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { collections, loading, error, refetch: fetchCollections };
}
