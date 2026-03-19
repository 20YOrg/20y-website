'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter, Link } from '@/navigation'
import UserMenu from './UserMenu'

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '简体中文' },
] as const

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function LangDropdown({ onClose }: { onClose?: () => void }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function switchLocale(newLocale: string) {
    router.push(pathname, { locale: newLocale })
    setOpen(false)
    onClose?.()
  }

  const current = LOCALES.find((l) => l.code === locale)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 hover:!text-[#1C4A60] transition-colors"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          fontWeight: 500,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#1a1a1a',
          letterSpacing: '0.02em',
        }}
      >
        <GlobeIcon />
        {current?.label}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 0,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            minWidth: 120,
            zIndex: 200,
            animation: 'langDropdown 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <style>{`
            @keyframes langDropdown {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '9px 14px',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: code === locale ? 600 : 400,
                color: code === locale ? '#1a1a1a' : '#7a7a7a',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              className="hover:bg-gray-50 hover:!text-[#1C4A60] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function switchLocale(newLocale: string) {
    router.push(pathname, { locale: newLocale })
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
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
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
          <LangDropdown />
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

      {/* Mobile dropdown */}
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
              {LOCALES.map(({ code, label }, i) => (
                <span key={code} className="flex items-center gap-3">
                  {i > 0 && <span style={{ color: '#e5e5e5', fontSize: 12 }}>|</span>}
                  <button
                    onClick={() => { switchLocale(code); setOpen(false) }}
                    className={`hover:text-[#1C4A60] transition-colors ${locale === code ? 'text-[#1a1a1a]' : 'text-[#7a7a7a]'}`}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 13,
                      fontWeight: locale === code ? 500 : 400,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {label}
                  </button>
                </span>
              ))}
            </div>
            <UserMenu locale={locale} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
