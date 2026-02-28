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
          marginBottom: 40,
          lineHeight: 1.2,
        }}
      >
        {t('title')}
      </h1>

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
