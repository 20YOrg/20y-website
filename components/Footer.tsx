'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 10,
  fontWeight: 600,
  color: '#7a7a7a',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  marginBottom: 14,
}

const LINK_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 13,
  fontWeight: 500,
  textDecoration: 'none',
  display: 'block',
  marginBottom: 10,
}

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setSubStatus(data.error === 'duplicate' ? 'duplicate' : 'error')
      }
    } catch {
      setSubStatus('error')
    }
  }

  return (
    <footer style={{ backgroundColor: '#fafafa' }}>
      {/* Main columns */}
      <div
        className="mx-auto px-5 md:px-8 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
        style={{ maxWidth: 1200 }}
      >
        {/* Col 1 — Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link
            href="/"
            className="hover:opacity-60 transition-opacity"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              fontWeight: 600,
              color: '#1a1a1a',
              textDecoration: 'none',
              display: 'block',
              marginBottom: 16,
              letterSpacing: '0.02em',
            }}
          >
            2ØY Fund
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: '#7a7a7a',
              lineHeight: 1.6,
              maxWidth: 200,
            }}
          >
            {t('tagline')}
          </p>
        </div>

        {/* Col 2 — Navigate */}
        <div>
          <p style={LABEL_STYLE}>{t('colNavigate')}</p>
          {[
            { href: '/principles', label: nav('principles') },
            { href: '/research', label: nav('research') },
            { href: '/founder', label: nav('founder') },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={LINK_STYLE} className="text-[#1a1a1a] hover:text-[#1C4A60] transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Col 3 — Connect */}
        <div>
          <p style={LABEL_STYLE}>{t('colConnect')}</p>
          <a
            href="mailto:ibai@20y.org"
            style={{ ...LINK_STYLE, display: 'inline-block', marginBottom: 12 }}
            className="text-[#1a1a1a] hover:text-[#1C4A60] transition-colors"
          >
            ibai@20y.org
          </a>
          <a
            href="https://x.com/20y_org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...LINK_STYLE, display: 'flex', alignItems: 'center', gap: 6 }}
            className="text-[#1a1a1a] hover:text-[#1C4A60] transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 1200 1227" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" stroke="currentColor" strokeWidth="60" strokeLinejoin="round" />
            </svg>
            @20y_org
          </a>
        </div>

        {/* Col 4 — Subscribe */}
        <div>
          <p style={LABEL_STYLE}>{t('colSubscribe')}</p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: '#7a7a7a',
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            {t('newsletter.description')}
          </p>
          {subStatus === 'success' ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#1a1a1a' }}>
              {t('newsletter.success')}
            </p>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubStatus('idle') }}
                  placeholder={t('newsletter.placeholder')}
                  required
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    color: '#1a1a1a',
                    borderTop: '1px solid #e5e5e5',
                    borderBottom: '1px solid #e5e5e5',
                    borderLeft: '1px solid #e5e5e5',
                    borderRight: 'none',
                    backgroundColor: '#ffffff',
                    padding: '7px 10px',
                    outline: 'none',
                    flex: 1,
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#ffffff',
                    border: '1px solid #1C4A60',
                    padding: '7px 12px',
                    backgroundColor: '#1C4A60',
                    cursor: subStatus === 'loading' ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {subStatus === 'loading' ? '…' : t('newsletter.button')}
                </button>
              </div>
              {(subStatus === 'duplicate' || subStatus === 'error') && (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#b00', marginTop: 6 }}>
                  {subStatus === 'duplicate' ? t('newsletter.duplicate') : t('newsletter.error')}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Bottom legal strip */}
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: 1200 }}>
        <div style={{ borderTop: '1px solid #e8e8e5' }} />
      </div>
      <div>
        <div
          className="mx-auto px-5 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
          style={{ maxWidth: 1200 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 300,
              color: '#b0b0b0',
              letterSpacing: '0.02em',
            }}
          >
            © {new Date().getFullYear()} 2ØY Fund. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 300,
              color: '#b0b0b0',
              letterSpacing: '0.02em',
            }}
          >
            {t('confidential')}
          </p>
        </div>
      </div>
    </footer>
  )
}
