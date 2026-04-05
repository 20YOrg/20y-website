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
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {/* Portal label */}
        <div style={{ padding: '36px 24px 24px' }}>
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

        <nav className="flex flex-col flex-1" style={{ padding: '0 12px' }}>
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
        </nav>

        {/* Logout */}
        <div style={{ padding: '8px 12px 32px' }}>
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
            }}
          >
            <IconLogout />
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div
        className="flex md:hidden items-center"
        style={{ borderBottom: '1px solid #ebebeb', backgroundColor: '#ffffff', padding: '0 4px' }}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? '#1a1a1a' : '#888888',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '14px 16px',
                borderBottom: active ? '2px solid #1a1a1a' : '2px solid transparent',
                minHeight: 44,
              }}
            >
              <Icon active={active} />
              {label}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: '#888888',
            background: 'none',
            border: 'none',
            borderBottom: '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '14px 16px',
            marginLeft: 'auto',
            minHeight: 44,
          }}
        >
          <IconLogout />
          {t('logout')}
        </button>
      </div>
    </>
  )
}
