import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Temporarily disable authentication for preview
  return NextResponse.next()
  
  /* 
  // Uncomment this section when you implement actual authentication
  const token = request.cookies.get('auth-token')?.value
  const role = request.cookies.get('user-role')?.value // 'business-admin' | 'super-admin'
  const pathname = request.nextUrl.pathname

  // Protect Business Admin Dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!token || role !== 'business-admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect Super Admin routes
  if (pathname.startsWith('/superadmin/dashboard')) {
    if (!token || role !== 'super-admin') {
      return NextResponse.redirect(new URL('/superadmin/login', request.url))
    }
  }

  // Redirect authenticated users away from login pages
  if (token && pathname === '/login' && role === 'business-admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (token && pathname === '/superadmin/login' && role === 'super-admin') {
    return NextResponse.redirect(new URL('/superadmin/dashboard', request.url))
  }

  // Allow all other routes (captive-portal is public)
  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
