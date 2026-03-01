import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import AdminInviteForm from './AdminInviteForm'

export default async function AdminInvitePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('directus_token')?.value
  const locale = await getLocale()

  if (!token) {
    const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
    redirect(loginPath)
  }

  return <AdminInviteForm />
}
