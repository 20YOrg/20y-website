import { NextRequest, NextResponse } from 'next/server'
import { normalizeEmail } from '@/lib/email'

const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.DIRECTUS_TOKEN

export async function POST(req: NextRequest) {
  if (!BASE || !TOKEN) return NextResponse.json({ error: 'server' }, { status: 503 })

  const { email } = await req.json()
  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail) return NextResponse.json({ error: 'invalid_email' }, { status: 400 })

  const res = await fetch(`${BASE}/items/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ email: normalizedEmail }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const errStr = JSON.stringify(err).toLowerCase()
    if (errStr.includes('unique') || errStr.includes('duplicate')) {
      return NextResponse.json({ error: 'duplicate' }, { status: 409 })
    }
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
