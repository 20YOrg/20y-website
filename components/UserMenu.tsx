'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

interface UserMenuProps {
  locale: string
  onClose?: () => void
}

export default function UserMenu({ locale, onClose }: UserMenuProps) {
  const t = useTranslations('nav')
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setUser(data?.email ? data : null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  if (!user) {
    return (
      <Link
        href="/auth/login"
        onClick={onClose}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          border: '1px solid #1C4A60',
          padding: '6px 14px',
          backgroundColor: '#1C4A60',
          color: '#ffffff',
        }}
        className="no-underline hover:opacity-80 transition-opacity"
      >
        {t('login')}
      </Link>
    )
  }

  const displayName = user.name || user.email

  return (
    <Link
      href="/dashboard"
      onClick={onClose}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
      }}
      className="text-[#1a1a1a] hover:text-[#1C4A60] transition-colors duration-150"
    >
      {displayName}
    </Link>
  )
}
