'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">500</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Something went wrong</p>
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-md">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
