'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, Suspense } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={<>{children}</>}>
        {children}
      </Suspense>
    </SessionProvider>
  );
}
