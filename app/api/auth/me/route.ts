import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/directus'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('directus_token')?.value
  if (!token) {
    return NextResponse.json(null, { status: 401 })
  }

  const user = await getCurrentUser(token)
  if (!user) {
    return NextResponse.json(null, { status: 401 })
  }

  const name = [user.first_name, user.last_name].filter(Boolean).join(' ')
  return NextResponse.json({ email: user.email, name: name || undefined })
}
