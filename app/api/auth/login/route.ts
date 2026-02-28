import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/directus'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }

  try {
    const tokens = await loginUser(body.email, body.password)
    const response = NextResponse.json({ success: true })

    response.cookies.set('directus_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Math.floor(tokens.expires / 1000),
      path: '/',
    })

    response.cookies.set('directus_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Login failed'
    if (message.includes('configured')) {
      return NextResponse.json({ error: 'server' }, { status: 503 })
    }
    return NextResponse.json({ error: 'invalid' }, { status: 401 })
  }
}
