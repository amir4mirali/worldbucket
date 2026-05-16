'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Map } from '@/components/map/Map';
import { Header } from '@/components/Header';

export default function MapPage() {

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Header />

        <main className="h-[calc(100vh-60px)]">
          <Map />
        </main>
      </div>
    </ProtectedRoute>
  );
}
