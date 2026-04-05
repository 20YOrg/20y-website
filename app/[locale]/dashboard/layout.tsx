import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import DashboardSidebar from '@/components/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('directus_token')?.value
  const locale = await getLocale()

  if (!token) {
    const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
    redirect(loginPath)
  }

  return (
    <div className="mx-auto px-5 md:px-8" style={{ maxWidth: 1200, minHeight: 'calc(100vh - 64px)' }}>
      <div className="flex flex-col md:flex-row" style={{ minHeight: 'inherit' }}>
        <DashboardSidebar locale={locale} />
        <main className="flex-1 min-w-0" style={{ paddingLeft: 40 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
