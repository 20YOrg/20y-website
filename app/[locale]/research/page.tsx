import { getTranslations, getLocale } from 'next-intl/server'
import { getPublishedResearchPosts } from '@/lib/directus'
import ResearchCard from '@/components/ResearchCard'

export default async function ResearchPage() {
  const t = await getTranslations('research')
  const locale = await getLocale()
  const posts = await getPublishedResearchPosts()

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
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        {t('title')}
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: '#4a4a4a',
          lineHeight: 1.75,
          marginBottom: 40,
          maxWidth: 640,
        }}
      >
        {t('intro')}
      </p>

      {posts.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: '#7a7a7a',
            borderTop: '1px solid #e5e5e5',
            paddingTop: 32,
          }}
        >
          {t('noArticles')}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          {posts.map((post) => (
            <ResearchCard
              key={post.id}
              post={post}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  )
}
