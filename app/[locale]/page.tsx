import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

export default function HomePage() {
  return <HomeContent />
}

function HomeContent() {
  const t = useTranslations('home')

  return (
    <div
      className="mx-auto px-5 md:px-8 py-14 md:py-24"
      style={{ maxWidth: 800 }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(30px, 6vw, 48px)',
          fontWeight: 400,
          color: '#1a1a1a',
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        {t('headline')}
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: '#4a4a4a',
          lineHeight: 1.5,
          marginBottom: 28,
          fontWeight: 400,
        }}
      >
        {t('subtitle')}
      </p>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: '#4a4a4a',
          lineHeight: 1.75,
          marginBottom: 48,
        }}
      >
        {t('body')}
      </p>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            color: '#7a7a7a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 20,
          }}
        >
          {t('links.heading')}
        </p>
        <div className="flex flex-col gap-3">
          {[
            { href: '/principles', label: t('links.principles') },
            { href: '/research', label: t('links.research') },
            { href: '/founder', label: t('links.founder') },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:opacity-60 transition-opacity"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 20,
                color: '#1a1a1a',
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
