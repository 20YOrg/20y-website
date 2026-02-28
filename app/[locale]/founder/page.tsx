import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function FounderPage() {
  return <FounderContent />
}

function FounderContent() {
  const t = useTranslations('founder')

  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const

  return (
    <div
      className="mx-auto px-5 md:px-8 py-14 md:py-24"
      style={{ maxWidth: 800 }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: 400,
          color: '#1a1a1a',
          marginBottom: 40,
          lineHeight: 1.2,
        }}
      >
        {t('title')}
      </h1>

      {/* Photo + name/credentials — stacks on mobile */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start" style={{ marginBottom: 40 }}>
        <div style={{ flexShrink: 0 }}>
          <Image
            src="/ibai-basabe.jpg"
            alt="Ibai Basabe"
            width={220}
            height={280}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              width: '100%',
              maxWidth: 220,
            }}
          />
        </div>
        <div style={{ paddingTop: 4 }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 500,
              color: '#1a1a1a',
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            {t('name')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#7a7a7a',
              lineHeight: 1.8,
            }}
          >
            {t('credentials')}
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e5e5', marginBottom: 36 }} />

      {/* Article */}
      <div className="flex flex-col gap-6">
        {paragraphs.map((key) => (
          <p
            key={key}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              color: '#4a4a4a',
              lineHeight: 1.8,
            }}
          >
            {t(key)}
          </p>
        ))}
      </div>
    </div>
  )
}
