import { notFound } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/navigation'
import { getResearchPostBySlug } from '@/lib/directus'
import { formatDate } from '@/lib/utils'

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const t = await getTranslations('research')
  const locale = await getLocale()
  const post = await getResearchPostBySlug(slug)

  if (!post) notFound()

  return (
    <div
      className="mx-auto px-8 py-24"
      style={{ maxWidth: 800 }}
    >
      <Link
        href="/research"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#7a7a7a',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 40,
        }}
        className="hover:underline"
      >
        {t('backLink')}
      </Link>

      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: '#7a7a7a',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 16,
        }}
      >
        {formatDate(post.publish_date, locale)}
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 40,
          fontWeight: 400,
          color: '#1a1a1a',
          lineHeight: 1.2,
          marginBottom: 32,
        }}
      >
        {post.title}
      </h1>

      {post.video_url && (
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            marginBottom: 32,
            border: '1px solid #e5e5e5',
          }}
        >
          <iframe
            src={post.video_url}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            allowFullScreen
            title={post.title}
          />
        </div>
      )}

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: '#4a4a4a',
          lineHeight: 1.75,
          marginBottom: 32,
        }}
      >
        {post.executive_summary}
      </p>

      {post.framework_image && (
        <div style={{ marginTop: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.framework_image}
            alt={`${post.title} framework`}
            style={{ width: '100%', border: '1px solid #e5e5e5' }}
          />
        </div>
      )}
    </div>
  )
}
