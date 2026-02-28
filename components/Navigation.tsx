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
    <header style={{ borderBottom: '1px solid #e5e5e5', backgroundColor: '#ffffff', position: 'relative' }}>
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
                fontWeight: 700,
                textDecoration: 'none',
              }}
              className="text-[#1a1a1a] hover:text-[#1C4A60] transition-colors"
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
                  className={`hover:text-[#1C4A60] transition-colors ${locale === loc ? 'text-[#1a1a1a]' : 'text-[#7a7a7a]'}`}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
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

        {/* Mobile hamburger — icon crossfades between ☰ and ✕ */}
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
          <div style={{ position: 'relative', width: 20, height: 20 }}>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                opacity: open ? 0 : 1,
                transform: open ? 'rotate(90deg) scale(0.7)' : 'rotate(0deg) scale(1)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                opacity: open ? 1 : 0,
                transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.7)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </div>
        </button>
      </nav>

      {/* Mobile dropdown — floats over page content */}
      {open && (
        <div
          className="flex flex-col md:hidden"
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(250, 250, 250, 0.82)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid #e5e5e5',
            zIndex: 100,
            animation: 'slideDown 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                padding: '14px 20px',
                display: 'block',
              }}
              className="text-[#1a1a1a] hover:text-[#1C4A60] transition-colors"
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
                    className={`hover:text-[#1C4A60] transition-colors ${locale === loc ? 'text-[#1a1a1a]' : 'text-[#7a7a7a]'}`}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 13,
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
