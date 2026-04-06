import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/navigation'
import { getMarketReportBySlug } from '@/lib/directus'
import { formatDate } from '@/lib/utils'
import ReportContent from '@/components/ReportContent'

export default async function MarketReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const report = await getMarketReportBySlug(slug)

  if (!report) notFound()

  return (
    <div style={{ padding: '40px 0 80px' }}>

      {/* Reading column — constrained for comfortable line length */}
      <div style={{ maxWidth: 660, margin: '0 auto' }}>

      {/* Back link */}
      <Link
        href="/dashboard/market-reports"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 500,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 40,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
        className="text-[#bbbbbb] hover:text-[#1C4A60] transition-colors duration-150"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Market Reports
      </Link>

        {/* Date */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 600,
          color: '#bbbbbb',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 14,
        }}>
          {formatDate(report.date_published, locale)}
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 400,
          color: '#1a1a1a',
          lineHeight: 1.2,
          marginBottom: 32,
          letterSpacing: '-0.01em',
        }}>
          {report.title}
        </h1>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', marginBottom: 36 }} />

        {/* PDF download */}
        {report.pdf_url && (
          <a
            href={report.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              fontWeight: 500,
              color: '#1a1a1a',
              border: '1px solid #1a1a1a',
              padding: '8px 16px',
              textDecoration: 'none',
              marginBottom: 40,
              letterSpacing: '0.03em',
            }}
            className="hover:bg-black hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        )}

        {/* Body content */}
        {report.content && <ReportContent html={report.content} />}
      </div>

      <style>{`
        .report-content {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #2a2a2a;
          line-height: 1.85;
        }
        .report-content h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.3;
          margin: 52px 0 14px;
          letter-spacing: -0.01em;
        }
        .report-content h3 {
          font-family: var(--font-serif);
          font-size: 19px;
          font-weight: 400;
          color: #1a1a1a;
          margin: 36px 0 10px;
        }
        .report-content p {
          margin: 0 0 22px;
        }
        .report-content ul,
        .report-content ol {
          margin: 0 0 22px;
          padding-left: 20px;
        }
        .report-content li {
          margin-bottom: 8px;
          padding-left: 4px;
        }
        .report-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .report-content em {
          font-style: italic;
          color: #4a4a4a;
        }
        .report-content a {
          color: #1a1a1a;
          text-underline-offset: 3px;
        }
        .report-content blockquote {
          border-left: 2px solid #e0e0e0;
          margin: 28px 0;
          padding: 4px 0 4px 20px;
          color: #555555;
          font-style: italic;
        }
        .report-content hr {
          border: none;
          border-top: 1px solid #ebebeb;
          margin: 40px 0;
        }
      `}</style>
    </div>
  )
}
