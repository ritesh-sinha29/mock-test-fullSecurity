import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to home page and API routes
  if (pathname === '/' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // For quiz page, check if we have the necessary session data
  // Since we're using Zustand (client-side), we can't check here
  // But we can add headers to ensure the page is accessed properly
  if (pathname === '/quiz' || pathname === '/results') {
    const response = NextResponse.next();
    
    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
