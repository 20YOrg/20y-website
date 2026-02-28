'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation'

function localePath(locale: string, path: string) {
  if (locale === 'en') return path
  return `/${locale}${path === '/' ? '' : path}`
}

export default function LoginPage() {
  const t = useTranslations('auth.login')
  const router = useRouter()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<'invalid' | 'server' | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push(localePath(locale, '/dashboard'))
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error === 'server' ? 'server' : 'invalid')
      }
    } catch {
      setError('server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="mx-auto px-5 md:px-8 py-14 md:py-24"
      style={{ maxWidth: 420 }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32,
          fontWeight: 400,
          color: '#1a1a1a',
          marginBottom: 40,
        }}
      >
        {t('title')}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: '#7a7a7a',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: '#1a1a1a',
              border: '1px solid #e5e5e5',
              padding: '10px 12px',
              outline: 'none',
              width: '100%',
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: '#7a7a7a',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: '#1a1a1a',
              border: '1px solid #e5e5e5',
              padding: '10px 12px',
              outline: 'none',
              width: '100%',
            }}
          />
        </div>

        {error && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#b00',
            }}
          >
            {error === 'server' ? t('serverError') : t('error')}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: loading ? '#7a7a7a' : '#1a1a1a',
            border: '1px solid #1a1a1a',
            padding: '10px 24px',
            background: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 8,
          }}
          className="hover:bg-black hover:text-white transition-colors"
        >
          {loading ? '…' : t('submit')}
        </button>
      </form>
    </div>
  )
}
