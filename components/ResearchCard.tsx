import FadeImage from './FadeImage'
import { Link } from '@/navigation'
import { formatDate } from '@/lib/utils'
import { getAssetUrl } from '@/lib/directus'
import type { ResearchPost } from '@/lib/directus'

interface ResearchCardProps {
  post: ResearchPost
  locale: string
}

export default function ResearchCard({ post, locale }: ResearchCardProps) {
  const plainSummary = post.executive_summary.replace(/<[^>]*>/g, '')
  const imageUrl = getAssetUrl(post.framework_image)

  return (
    <Link
      href={`/research/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        style={{
          borderTop: '1px solid #e5e5e5',
          paddingTop: 24,
          paddingBottom: 24,
        }}
        className="flex flex-col md:flex-row gap-4 md:gap-10 md:items-start group-hover:opacity-75 transition-opacity"
      >
        {imageUrl && (
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
            }}
            className="w-full md:w-[200px] md:flex-shrink-0"
          >
            <FadeImage
              src={imageUrl}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#7a7a7a',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {formatDate(post.publish_date, locale)}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 500,
              color: '#1a1a1a',
              marginBottom: 10,
              lineHeight: 1.3,
            }}
            className="group-hover:text-[#1C4A60] transition-colors"
          >
            {post.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: '#4a4a4a',
              lineHeight: 1.65,
            }}
          >
            {plainSummary.length > 180 ? plainSummary.slice(0, 180) + '…' : plainSummary}
          </p>
        </div>
      </div>
    </Link>
  )
}
