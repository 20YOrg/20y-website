import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/navigation'
import { getMarketReports } from '@/lib/directus'
import { formatDate } from '@/lib/utils'

function EnvelopeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cccccc"
      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export default async function MarketReportsPage() {
  const t = await getTranslations('dashboard.marketReports')
  const locale = await getLocale()
  const reports = await getMarketReports(locale)

  return (
    <div style={{ padding: '40px 0 72px' }}>

      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 600,
          color: '#bbbbbb',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 10,
        }}>
          {t('membersOnly')}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(24px, 3.5vw, 34px)',
          fontWeight: 400,
          color: '#1a1a1a',
          lineHeight: 1.2,
        }}>
          {t('title')}
        </h1>
      </div>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: '#666666',
        lineHeight: 1.75,
        marginBottom: 28,
        maxWidth: 480,
      }}>
        {t('intro')}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', marginBottom: 24 }} />

      {reports.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '56px 32px',
          backgroundColor: '#fafafa',
          gap: 16,
          textAlign: 'center',
        }}>
          <EnvelopeIcon />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: '#999999',
            lineHeight: 1.7,
            maxWidth: 320,
          }}>
            {t('empty')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {reports.map((report) => (
            <Link
              key={report.slug}
              href={`/dashboard/market-reports/${report.slug}`}
              style={{ textDecoration: 'none' }}
              className="group"
            >
              <div style={{
                padding: '24px 0',
                borderBottom: '1px solid #f0f0f0',
              }}>
                {/* Date */}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 10,
                  fontWeight: 500,
                  color: '#bbbbbb',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}>
                  {formatDate(report.date_published, locale)}
                </p>

                {/* Title + arrow on same line */}
                <div className="flex items-start justify-between gap-6">
                  <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginBottom: report.summary ? 10 : 0,
                  }}
                    className="text-[#1a1a1a] group-hover:text-[#1C4A60] transition-colors duration-150"
                  >
                    {report.title}
                  </h2>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#cccccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: 5 }}
                    className="group-hover:stroke-[#1C4A60] group-hover:translate-x-1 transition-all duration-150"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Summary — clamped to 2 lines */}
                {report.summary && (
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#999999',
                    lineHeight: 1.65,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {report.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
