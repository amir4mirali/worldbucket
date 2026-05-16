import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export const middleware = withAuth(
  function middleware(request: NextRequest) {
    // Add any additional middleware logic here
    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access to protected routes only if user is authenticated
        return !!token;
      },
    },
  },
);

// Apply middleware only to protected routes
export const config = {
  matcher: ['/dashboard/:path*', '/map/:path*', '/collections/:path*', '/api/protected/:path*'],
};
