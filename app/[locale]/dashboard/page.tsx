import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { getInvestorByEmail } from '@/lib/directus'
import { formatDate } from '@/lib/utils'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 600,
      color: '#999999',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: 6,
    }}>
      {children}
    </p>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center"
      style={{ padding: '13px 0', borderBottom: '1px solid #f2f2f2' }}
    >
      <dt style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 500,
        color: '#999999',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        minWidth: 176,
        flexShrink: 0,
        marginBottom: 2,
      }}>
        {label}
      </dt>
      <dd style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: '#1a1a1a',
        lineHeight: 1.5,
        wordBreak: 'break-all',
      }}>
        {value}
      </dd>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 16,
        fontWeight: 400,
        color: '#1a1a1a',
        letterSpacing: '0.01em',
        marginBottom: 0,
        paddingBottom: 12,
        borderBottom: '1px solid #e8e8e8',
      }}>
        {title}
      </h2>
      <dl>{children}</dl>
    </section>
  )
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const locale = await getLocale()
  const t = await getTranslations('dashboard')

  const email = cookieStore.get('directus_email')?.value
  if (!email) {
    const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
    redirect(loginPath)
  }

  const investor = await getInvestorByEmail(email)

  return (
    <div style={{ padding: '40px 0 72px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 600,
          color: '#bbbbbb',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 12,
        }}>
          {t('title')}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(24px, 3.5vw, 34px)',
          fontWeight: 400,
          color: '#1a1a1a',
          lineHeight: 1.2,
        }}>
          {investor?.investor_name ?? email}
        </h1>
      </div>

      {!investor ? (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#999999' }}>
          {t('notFound')}
        </p>
      ) : (
        <>
          {/* Key stats */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: 1, backgroundColor: '#ebebeb', marginBottom: 48 }}
          >
            <div style={{ backgroundColor: '#ffffff', padding: '24px 24px 28px' }}>
              <Label>{t('investmentSummary.amount')}</Label>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 28,
                fontWeight: 400,
                color: '#1a1a1a',
                lineHeight: 1,
              }}>
                {Number(investor.investment_amount).toLocaleString('en-US')}
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                color: '#999999',
                marginTop: 4,
                letterSpacing: '0.05em',
              }}>
                {investor.currency ?? 'USDT'}
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '24px 24px 28px' }}>
              <Label>{t('investmentSummary.investmentDate')}</Label>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 400,
                color: '#1a1a1a',
                lineHeight: 1.2,
              }}>
                {formatDate(investor.investment_date, locale)}
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '24px 24px 28px' }}>
              <Label>{t('investmentSummary.status')}</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#2d8a2d',
                  flexShrink: 0,
                }} />
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#1a1a1a',
                }}>
                  {investor.status.charAt(0).toUpperCase() + investor.status.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Detail sections */}
          <Section title={t('investorInfo.heading')}>
            <Row label={t('investorInfo.name')} value={investor.investor_name} />
            <Row label={t('investorInfo.email')} value={investor.email} />
          </Section>

          <Section title={t('wallet.heading')}>
            <Row label={t('wallet.address')} value={investor.wallet_address || '—'} />
          </Section>

          <Section title={t('documents.heading')}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#bbbbbb',
              padding: '16px 0',
            }}>
              —
            </p>
          </Section>
        </>
      )}
    </div>
  )
}
