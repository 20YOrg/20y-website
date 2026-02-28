'use client'

import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, Link } from '@/navigation'

interface UserMenuProps {
  locale: string
}

export default function UserMenu({ locale }: UserMenuProps) {
  const t = useTranslations('nav')
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.email) setUser(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
    router.refresh()
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: '#1a1a1a',
          textDecoration: 'none',
          border: '1px solid #1a1a1a',
          padding: '6px 14px',
        }}
        className="hover:bg-black hover:text-white transition-colors"
      >
        {t('login')}
      </Link>
    )
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email.slice(0, 2).toUpperCase()

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="hover:opacity-70 transition-opacity"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {initials}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 40,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            minWidth: 160,
            zIndex: 50,
          }}
        >
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              padding: '10px 16px',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: '#1a1a1a',
              textDecoration: 'none',
            }}
            className="hover:bg-gray-50"
          >
            {t('dashboard')}
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px 16px',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: '#1a1a1a',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderTop: '1px solid #e5e5e5',
            }}
            className="hover:bg-gray-50"
          >
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  )
}
