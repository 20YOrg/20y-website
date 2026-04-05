import { NextRequest, NextResponse } from 'next/server'
import { getInvestorByEmail } from '@/lib/directus'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('directus_token')?.value
  const email = request.cookies.get('directus_email')?.value

  if (!token || !email) {
    return NextResponse.json(null, { status: 401 })
  }

  const investor = await getInvestorByEmail(email)
  const name = investor?.investor_name || undefined

  return NextResponse.json({ email, name })
}
