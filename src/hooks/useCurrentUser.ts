'use client';

import { useSession } from 'next-auth/react';
import { IUser } from '@/types';

export function useCurrentUser() {
  const { data: session } = useSession();

  return {
    user: session?.user as IUser | undefined,
    isAuthenticated: !!session?.user,
    userId: (session?.user as any)?.id,
    email: session?.user?.email,
    name: session?.user?.name,
  };
}
