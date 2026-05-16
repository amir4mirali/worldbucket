'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="hidden sm:inline">WorldBucket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/explore"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Explore
              </Link>
              <Link href={`/profile/${(session.user as any).username}`}>
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
              <button onClick={() => signOut()} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/explore" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 p-4 space-y-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/explore"
                className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Explore
              </Link>
              <button onClick={() => signOut()} className="w-full text-left text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="block">
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
