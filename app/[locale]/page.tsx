import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/navigation'
import HomeSubscribeForm from './HomeSubscribeForm'

export default async function HomePage() {
  const t = await getTranslations('home')

  return (
    <div className="mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-14 md:pb-24" style={{ maxWidth: 800 }}>

      {/* Hero */}
      <div style={{ paddingBottom: 32 }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 48px)',
            fontWeight: 400,
            color: '#1a1a1a',
            lineHeight: 1.1,
            marginBottom: 20,
            whiteSpace: 'nowrap',
          }}
        >
          {t('headline')}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontStyle: 'italic', fontWeight: 700, color: '#1C4A60', lineHeight: 1.75, marginBottom: 12 }}>
          {t('tagline')}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#4a4a4a', lineHeight: 1.75 }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Nav link sections */}
      <div style={{ marginBottom: 48 }}>
        {/* Principles */}
        <Link
          href="/principles"
          className="group hover:opacity-60 transition-opacity"
          style={{ display: 'block', padding: '20px 0', textDecoration: 'none' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
            {t('sections.principlesLabel')}
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#1a1a1a' }} className="group-hover:text-[#1C4A60] transition-colors">
            {t('sections.principlesLink')} <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </p>
        </Link>

        {/* Research */}
        <Link
          href="/research"
          className="group hover:opacity-60 transition-opacity"
          style={{ display: 'block', padding: '20px 0', borderTop: '1px solid #e5e5e5', textDecoration: 'none' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
            {t('sections.researchLabel')}
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#1a1a1a' }} className="group-hover:text-[#1C4A60] transition-colors">
            {t('sections.researchLink')} <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </p>
        </Link>

        {/* Founder */}
        <Link
          href="/founder"
          className="group hover:opacity-60 transition-opacity"
          style={{ display: 'block', padding: '20px 0', borderTop: '1px solid #e5e5e5', textDecoration: 'none' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#4a4a4a', lineHeight: 1.65, marginBottom: 8 }}>
            {t('sections.founderHook')}
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: '#1a1a1a' }} className="group-hover:text-[#1C4A60] transition-colors">
            {t('sections.founderLink')} <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </p>
        </Link>

        {/* Subscribe */}
        <div style={{ padding: '20px 0', borderTop: '1px solid #e5e5e5' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
            {t('sections.subscribeLabel')}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#4a4a4a', lineHeight: 1.7, marginBottom: 16 }}>
            {t('sections.subscribeDesc')}
          </p>
          <HomeSubscribeForm
            placeholder={t('sections.subscribePlaceholder')}
            button={t('sections.subscribeButton')}
            successMsg={t('sections.subscribeSuccess')}
            duplicateMsg={t('sections.subscribeDuplicate')}
            errorMsg={t('sections.subscribeError')}
          />
        </div>
      </div>

      {/* Our Ethos */}
      <section style={{ paddingTop: 40, textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Badge */}
          <div style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: 40,
            border: '1px solid #e5e5e5',
            boxShadow: '0 0 0 8px #ffffff, 0 0 0 9px #e5e5e5',
            flexShrink: 0,
          }}>
            <Image
              src="/inmathwetrust.png"
              alt="In Math We Trust"
              width={180}
              height={180}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Label */}
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#B8973A', marginBottom: 16 }}>
            {t('ethosLabel')}
          </p>

          {/* Rule */}
          <div style={{ width: 40, height: 1, background: '#B8973A', marginBottom: 28 }} />

          {/* Text */}
          {[t('mission1'), t('mission2')].map((para, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.9, color: '#4a4a4a', fontWeight: 500, textIndent: '2em', marginBottom: i === 0 ? 24 : 0 }}>
              {para}
            </p>
          ))}

        </div>
      </section>

    </div>
  )
}
