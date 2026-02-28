import { NextRequest, NextResponse } from 'next/server'
import { logoutUser } from '@/lib/directus'

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('directus_refresh_token')?.value

  if (refreshToken) {
    await logoutUser(refreshToken)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.delete('directus_token')
  response.cookies.delete('directus_refresh_token')
  return response
}
