'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { usePathname } from 'next/navigation'

interface DashboardSidebarProps {
  locale: string
}

function IconDashboard({ active }: { active: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function IconReports({ active }: { active: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export default function DashboardSidebar({ locale }: DashboardSidebarProps) {
  const t = useTranslations('dashboard.nav')
  const rawPathname = usePathname()
  const pathname = locale !== 'en' ? rawPathname.replace(`/${locale}`, '') || '/' : rawPathname

  const links = [
    { href: '/dashboard', label: t('dashboard'), icon: IconDashboard },
    { href: '/dashboard/market-reports', label: t('marketReports'), icon: IconReports },
  ]

  const isReportDetail = pathname.startsWith('/dashboard/market-reports/') &&
    pathname !== '/dashboard/market-reports'

  function isActive(href: string) {
    if (href.endsWith('/dashboard')) return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col"
        style={{
          width: 216,
          minWidth: 216,
          borderRight: '1px solid #ebebeb',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Portal label */}
        <div style={{ padding: '40px 24px 24px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 600,
            color: '#bbbbbb',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}>
            Member Portal
          </p>
        </div>

        {/* Nav links */}
        <style>{`
          .sidebar-link { color: #888888; transition: color 0.15s; }
          .sidebar-link:hover { color: #1C4A60; }
          .sidebar-logout { background: none; color: #888888; transition: color 0.15s; }
          .sidebar-logout:hover { color: #1C4A60; }
        `}</style>

        <nav className="flex flex-col flex-1" style={{ padding: '0 12px 32px' }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className={active ? '' : 'sidebar-link'}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#1a1a1a' : undefined,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '11px 12px',
                  borderRadius: 4,
                  backgroundColor: active ? '#f5f5f5' : undefined,
                  minHeight: 44,
                }}
              >
                <Icon active={active} />
                {label}
              </Link>
            )
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="sidebar-logout"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 400,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 12px',
              width: '100%',
              minHeight: 44,
              borderRadius: 4,
              marginTop: 'auto',
            }}
          >
            <IconLogout />
            {t('logout')}
          </button>
        </nav>
      </aside>

      {/* Mobile: back button on detail pages */}
      {isReportDetail && (
        <Link
          href="/dashboard/market-reports"
          className="flex md:hidden items-center gap-2"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            textDecoration: 'none',
            marginTop: 24,
            padding: '7px 0',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('marketReports')}
        </Link>
      )}

      {/* Mobile tab bar */}
      {!isReportDetail && (
      <nav
        className="flex md:hidden items-center gap-2"
        style={{ marginTop: 24 }}
      >
        {links.map(({ href, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: active ? '#1a1a1a' : '#aaaaaa',
                textDecoration: 'none',
                padding: '7px 12px',
                borderRadius: 20,
                backgroundColor: active ? '#f0f0f0' : 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '7px 8px',
            marginLeft: 'auto',
            color: '#999999',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 20,
          }}
        >
          <IconLogout />
        </button>
      </nav>
      )}
    </>
  )
}
