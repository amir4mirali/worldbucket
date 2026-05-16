import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, Map } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <Globe className="h-6 w-6 text-blue-500" />
            WorldBucket
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Save Your Travel <span className="text-blue-500">Dreams</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Create your personal world map, save places you want to visit, collaborate with friends,
            and explore public maps. All in one beautiful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 hover:bg-slate-800 text-base"
              >
                Browse Public Maps
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why WorldBucket?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <Map className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
              <p className="text-slate-400">
                Save places anywhere on the world map. Click, search, and organize all your travel
                dreams in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <Users className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Collaborate</h3>
              <p className="text-slate-400">
                Invite friends and family to collaborate on travel plans. Share ideas and build
                itineraries together.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <Globe className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Explore</h3>
              <p className="text-slate-400">
                Discover public maps from other travelers. Get inspired and find new travel ideas
                from the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of travelers saving their dream destinations.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base">
              Create Your Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-slate-400">
          <p>&copy; 2024 WorldBucket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
