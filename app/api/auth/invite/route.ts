import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL

export async function POST(req: NextRequest) {
  if (!BASE) {
    return NextResponse.json({ error: 'server' }, { status: 503 })
  }

  const { token, password } = await req.json()

  if (!token || !password) {
    return NextResponse.json({ error: 'missing' }, { status: 400 })
  }

  try {
    const res = await fetch(`${BASE}/users/invite/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
