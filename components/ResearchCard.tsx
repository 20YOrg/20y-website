import { Link } from '@/navigation'
import { formatDate } from '@/lib/utils'
import type { ResearchPost } from '@/lib/directus'

interface ResearchCardProps {
  post: ResearchPost
  locale: string
}

export default function ResearchCard({ post, locale }: ResearchCardProps) {
  return (
    <div
      style={{
        borderTop: '1px solid #e5e5e5',
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: '#7a7a7a',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {formatDate(post.date_published, locale)}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 20,
          fontWeight: 500,
          color: '#1a1a1a',
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        <Link
          href={`/research/${post.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          className="hover:underline"
        >
          {post.title}
        </Link>
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: '#4a4a4a',
          lineHeight: 1.6,
        }}
      >
        {post.executive_summary.length > 160
          ? post.executive_summary.slice(0, 160) + '…'
          : post.executive_summary}
      </p>
    </div>
  )
}
