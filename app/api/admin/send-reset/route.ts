import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://20y.org'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('directus_token')?.value
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  if (!BASE) return NextResponse.json({ error: 'server' }, { status: 503 })

  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'missing' }, { status: 400 })

  try {
    const res = await fetch(`${BASE}/auth/password/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        reset_url: `${SITE_URL}/auth/reset-password`,
      }),
    })

    if (!res.ok && res.status !== 204) {
      return NextResponse.json({ error: 'failed' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
