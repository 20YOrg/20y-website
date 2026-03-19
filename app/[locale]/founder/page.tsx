import { useTranslations } from 'next-intl'
import FadeImage from '@/components/FadeImage'

export default function FounderPage() {
  return <FounderContent />
}

function FounderContent() {
  const t = useTranslations('founder')

  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const

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
          marginBottom: 32,
          lineHeight: 1.2,
        }}
      >
        {t('title')}
      </h1>

      {/* Full-width photo within content column */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(200px, 30vw, 340px)',
          marginBottom: 28,
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
        }}
      >
        <FadeImage
          src="/ibai-basabe.jpg"
          alt="Ibai Basabe"
          sizes="(max-width: 960px) 100vw, 960px"
          objectPosition="center 70%"
        />
      </div>

      {/* Name + social buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 500,
            color: '#1a1a1a',
            lineHeight: 1.2,
          }}
        >
          {t('name')}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href="https://x.com/IbaiBasabe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:!bg-[#1C4A60] transition-colors"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 1200 1227" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/ibaibasabe/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:!bg-[#1C4A60] transition-colors"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Credentials */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#7a7a7a',
          lineHeight: 1.8,
          marginBottom: 40,
        }}
      >
        {t('credentials')}
      </p>

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
