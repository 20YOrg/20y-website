import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.DIRECTUS_TOKEN
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://20y.org'
const INVESTORS_ROLE_ID = process.env.DIRECTUS_INVESTORS_ROLE_ID

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('directus_token')?.value
  if (!sessionToken) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!BASE || !TOKEN) return NextResponse.json({ error: 'server' }, { status: 503 })

  const { investor_name, email, investment_amount, currency, investment_date, wallet_address, status } = await req.json()

  if (!investor_name || !email || !investment_amount || !investment_date) {
    return NextResponse.json({ error: 'missing' }, { status: 400 })
  }

  // Step 1: Send invite — Directus creates the user and sends the invite email in one step
  const inviteRes = await fetch(`${BASE}/users/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({
      email,
      role: INVESTORS_ROLE_ID,
      invite_url: `${SITE_URL}/auth/invite`,
    }),
  })

  if (!inviteRes.ok && inviteRes.status !== 204) {
    const err = await inviteRes.json().catch(() => ({}))
    const errStr = JSON.stringify(err).toLowerCase()
    if (!errStr.includes('unique') && !errStr.includes('duplicate') && !errStr.includes('already')) {
      return NextResponse.json({ error: 'user_failed', details: err }, { status: 400 })
    }
  }

  // Step 2: Save investor record
  const investorPayload = {
    investor_name,
    email,
    investment_amount: parseFloat(investment_amount),
    currency: currency || 'USDT',
    investment_date,
    wallet_address: wallet_address || null,
    status: status || 'active',
  }
  const investorRes = await fetch(`${BASE}/items/investors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(investorPayload),
  })

  if (!investorRes.ok) {
    const err = await investorRes.json().catch(() => ({}))
    return NextResponse.json({ error: 'investor_failed', details: err }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
