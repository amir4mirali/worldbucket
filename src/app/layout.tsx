import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WorldBucket - Save & Explore Travel Dreams',
  description:
    'Create your personal travel map, save places you want to visit, collaborate with friends, and explore the world together.',
  keywords: [
    'travel',
    'bucket list',
    'map',
    'places',
    'collaboration',
    'wishlist',
    'world',
  ],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
