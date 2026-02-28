import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './routing'

const intlMiddleware = createMiddleware(routing)

const protectedPaths = ['/dashboard', '/es/dashboard', '/zh/dashboard']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (protectedPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    const token = request.cookies.get('directus_token')?.value
    if (!token) {
      const locale = pathname.startsWith('/es')
        ? 'es'
        : pathname.startsWith('/zh')
          ? 'zh'
          : 'en'
      const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
      return NextResponse.redirect(new URL(loginPath, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
