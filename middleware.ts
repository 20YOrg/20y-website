import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './routing'

const intlMiddleware = createMiddleware(routing)

const protectedPaths = ['/dashboard', '/es/dashboard', '/zh/dashboard']

function getLocaleFromPath(pathname: string) {
  if (pathname.startsWith('/es')) return 'es'
  if (pathname.startsWith('/zh')) return 'zh'
  return 'en'
}

async function tryRefresh(refreshToken: string) {
  const base = process.env.NEXT_PUBLIC_DIRECTUS_URL
  if (!base) return null
  try {
    const res = await fetch(`${base}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken, mode: 'json' }),
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data as { access_token: string; refresh_token: string; expires: number } | null
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (protectedPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    const token = request.cookies.get('directus_token')?.value
    const refreshToken = request.cookies.get('directus_refresh_token')?.value

    if (!token) {
      // Try to refresh
      if (refreshToken) {
        const newTokens = await tryRefresh(refreshToken)
        if (newTokens) {
          const response = intlMiddleware(request)
          const secure = process.env.NODE_ENV === 'production'
          const sevenDays = 60 * 60 * 24 * 7
          response.cookies.set('directus_token', newTokens.access_token, {
            httpOnly: true, secure, sameSite: 'lax',
            maxAge: Math.floor(newTokens.expires / 1000), path: '/',
          })
          response.cookies.set('directus_refresh_token', newTokens.refresh_token, {
            httpOnly: true, secure, sameSite: 'lax',
            maxAge: sevenDays, path: '/',
          })
          const email = request.cookies.get('directus_email')?.value
          if (email) {
            response.cookies.set('directus_email', email, {
              httpOnly: true, secure, sameSite: 'lax',
              maxAge: sevenDays, path: '/',
            })
          }
          return response
        }
      }

      // No valid token or refresh failed → redirect to login
      const locale = getLocaleFromPath(pathname)
      const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
      return NextResponse.redirect(new URL(loginPath, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
