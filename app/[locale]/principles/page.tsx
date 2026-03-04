import { useTranslations } from 'next-intl'
import PrincipleCard from '@/components/PrincipleCard'

export default function PrinciplesPage() {
  return <PrinciplesContent />
}

function PrinciplesContent() {
  const t = useTranslations('principles')

  const cards = [
    { key: 'card1' as const },
    { key: 'card2' as const },
    { key: 'card3' as const },
    { key: 'card4' as const },
  ]

  return (
    <div
      className="mx-auto px-5 md:px-8 py-14 md:py-24"
      style={{ maxWidth: 960 }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: 400,
          color: '#1a1a1a',
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        {t('title')}
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#1C4A60',
          lineHeight: 1.75,
          marginBottom: 12,
          maxWidth: 680,
        }}
      >
        {t('tagline')}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: '#4a4a4a',
          lineHeight: 1.75,
          marginBottom: 48,
          maxWidth: 680,
        }}
      >
        {t('subtitle')}
      </p>

      <div>
        {cards.map(({ key }, i) => (
          <PrincipleCard
            key={key}
            heading={t(`${key}.heading`)}
            body={t(`${key}.body`)}
            isLast={i === cards.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
