'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter, Link } from '@/navigation'
import UserMenu from './UserMenu'

const LOCALES = ['en', 'es', 'zh'] as const

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function switchLocale(newLocale: string) {
    router.push(pathname, { locale: newLocale })
    setOpen(false)
  }

  const navLinks = [
    { href: '/principles', label: t('principles') },
    { href: '/research', label: t('research') },
    { href: '/founder', label: t('founder') },
  ]

  return (
    <header style={{ borderBottom: '1px solid #e5e5e5', backgroundColor: '#ffffff' }}>
      {/* Main bar */}
      <nav
        className="mx-auto flex items-center justify-between px-5 md:px-8"
        style={{ maxWidth: 1200, height: 64 }}
      >
        {/* Logo — no hover effect */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 20,
            color: '#1a1a1a',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          2ØY Fund
        </Link>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 600,
                color: '#1a1a1a',
                textDecoration: 'none',
              }}
              className="hover:underline transition-all"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            {LOCALES.map((loc, i) => (
              <span key={loc} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: '#e5e5e5', fontSize: 12 }}>|</span>}
                <button
                  onClick={() => switchLocale(loc)}
                  className="hover:opacity-60 transition-opacity"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    color: locale === loc ? '#1a1a1a' : '#7a7a7a',
                    fontWeight: locale === loc ? 500 : 400,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {loc}
                </button>
              </span>
            ))}
          </div>
          <UserMenu locale={locale} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden items-center justify-center hover:opacity-60 transition-opacity"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: '#1a1a1a',
          }}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="flex flex-col md:hidden"
          style={{ borderTop: '1px solid #e5e5e5', backgroundColor: '#ffffff' }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontWeight: 600,
                color: '#1a1a1a',
                textDecoration: 'none',
                padding: '14px 20px',
                borderBottom: '1px solid #e5e5e5',
                display: 'block',
              }}
              className="hover:bg-gray-50 transition-colors"
            >
              {label}
            </Link>
          ))}

          {/* Language + login */}
          <div
            className="flex items-center justify-between"
            style={{ padding: '14px 20px' }}
          >
            <div className="flex items-center gap-3">
              {LOCALES.map((loc, i) => (
                <span key={loc} className="flex items-center gap-3">
                  {i > 0 && <span style={{ color: '#e5e5e5', fontSize: 12 }}>|</span>}
                  <button
                    onClick={() => switchLocale(loc)}
                    className="hover:opacity-60 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 13,
                      color: locale === loc ? '#1a1a1a' : '#7a7a7a',
                      fontWeight: locale === loc ? 500 : 400,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {loc}
                  </button>
                </span>
              ))}
            </div>
            <UserMenu locale={locale} />
          </div>
        </div>
      )}
    </header>
  )
}
