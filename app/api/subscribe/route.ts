import { NextRequest, NextResponse } from 'next/server'

const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.DIRECTUS_TOKEN

export async function POST(req: NextRequest) {
  if (!BASE || !TOKEN) return NextResponse.json({ error: 'server' }, { status: 503 })

  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'missing' }, { status: 400 })

  const res = await fetch(`${BASE}/items/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const errStr = JSON.stringify(err).toLowerCase()
    if (errStr.includes('unique') || errStr.includes('duplicate')) {
      return NextResponse.json({ error: 'duplicate' }, { status: 409 })
    }
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }

  // Send emails (fire and forget)
  const notifications = [
    {
      to: 'ibai@20y.org',
      subject: 'New Newsletter Subscriber',
      html: `<p>A new subscriber just signed up: <strong>${email}</strong></p>`,
    },
    {
      to: 'rebekah@20y.org',
      subject: 'New Newsletter Subscriber',
      html: `<p>A new subscriber just signed up: <strong>${email}</strong></p>`,
    },
    {
      to: email,
      subject: "You're subscribed to 2ØY Fund",
      html: `<p>Thank you for subscribing to the 2ØY Fund newsletter.</p><p>You'll receive our fund reports and structured insights on market cycles — thoughtful, infrequent, and worth reading.</p><p>— The 2ØY Team</p>`,
    },
  ]
  for (const mail of notifications) {
    fetch(`${BASE}/utils/mail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(mail),
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
