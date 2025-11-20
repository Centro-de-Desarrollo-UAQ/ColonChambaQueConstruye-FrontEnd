import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 
  const adminAuthCookie = request.cookies.get('admin-auth')?.value;

  
  if (!adminAuthCookie) {
    const url = new URL('/', request.url); 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
