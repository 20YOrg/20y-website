import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { getCurrentUser, getInvestorByEmail } from '@/lib/directus'
import { formatDate } from '@/lib/utils'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('directus_token')?.value
  const locale = await getLocale()
  const t = await getTranslations('dashboard')

  if (!token) {
    const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
    redirect(loginPath)
  }

  const email = cookieStore.get('directus_email')?.value
  if (!email) {
    const loginPath = locale === 'en' ? '/auth/login' : `/${locale}/auth/login`
    redirect(loginPath)
  }

  const investor = await getInvestorByEmail(email)

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
          marginBottom: 48,
          lineHeight: 1.2,
        }}
      >
        {t('title')}
      </h1>

      {!investor ? (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#7a7a7a' }}>
          {t('notFound')}
        </p>
      ) : (
        <div className="flex flex-col gap-12">
          {/* Investor Information */}
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#1a1a1a', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #e5e5e5' }}>
              {t('investorInfo.heading')}
            </h2>
            <dl className="flex flex-col gap-4">
              {[
                { label: t('investorInfo.name'), value: investor.investor_name },
                { label: t('investorInfo.email'), value: investor.email },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-8">
                  <dt style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }} className="sm:min-w-[200px] sm:text-base sm:normal-case sm:tracking-normal">{label}</dt>
                  <dd style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#1a1a1a' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Investment Summary */}
          <section>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 500,
                color: '#1a1a1a',
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              {t('investmentSummary.heading')}
            </h2>
            <dl className="flex flex-col gap-4">
              {[
                { label: t('investmentSummary.amount'), value: `${Number(investor.investment_amount).toLocaleString('en-US')} ${investor.currency ?? 'USDT'}` },
                { label: t('investmentSummary.investmentDate'), value: formatDate(investor.investment_date, locale) },
                { label: t('investmentSummary.status'), value: investor.status.charAt(0).toUpperCase() + investor.status.slice(1) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-8">
                  <dt
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      color: '#7a7a7a',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 2,
                    }}
                    className="sm:min-w-[200px] sm:text-base sm:normal-case sm:tracking-normal"
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 15,
                      color: '#1a1a1a',
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Wallet */}
          <section>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 500,
                color: '#1a1a1a',
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              {t('wallet.heading')}
            </h2>
            <dl>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <dt
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    color: '#7a7a7a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 2,
                  }}
                  className="sm:min-w-[200px]"
                >
                  {t('wallet.address')}
                </dt>
                <dd
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: '#1a1a1a',
                    wordBreak: 'break-all',
                  }}
                >
                  {investor.wallet_address || '—'}
                </dd>
              </div>
            </dl>
          </section>

          {/* Documents */}
          <section>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 500,
                color: '#1a1a1a',
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              {t('documents.heading')}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#7a7a7a' }}>—</p>
          </section>
        </div>
      )}
    </div>
  )
}
