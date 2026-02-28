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
  color: '#1a1a1a',
  textDecoration: 'none',
  display: 'block',
  marginBottom: 10,
}

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const [email, setEmail] = useState('')

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
            A twenty-year horizon in digital asset investment.
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
            <Link key={href} href={href} style={LINK_STYLE} className="hover:underline">
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
            className="hover:underline"
          >
            ibai@20y.org
          </a>
          <a
            href="https://x.com/20y_org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...LINK_STYLE, display: 'flex', alignItems: 'center', gap: 6 }}
            className="hover:underline hover:opacity-70 transition-opacity"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631zM17.083 20.25l-11.5-15.5h-1.5l11.5 15.5z" />
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
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
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
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 600,
                color: '#ffffff',
                border: '1px solid #1a1a1a',
                padding: '7px 12px',
                backgroundColor: '#1a1a1a',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              className="hover:opacity-80 transition-opacity"
            >
              {t('newsletter.button')}
            </button>
          </div>
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
