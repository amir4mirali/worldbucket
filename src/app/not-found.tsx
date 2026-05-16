import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        <Link href="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
