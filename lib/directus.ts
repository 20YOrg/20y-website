const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.DIRECTUS_TOKEN

export function getAssetUrl(id: string | null | undefined): string | null {
  if (!id || !BASE) return null
  return `${BASE}/assets/${id}`
}

export interface ResearchPost {
  id: string
  slug: string
  title: string
  subtitle?: string
  publish_date: string
  executive_summary: string
  video_url?: string
  framework_image?: string
  status: 'published' | 'draft'
}

interface ResearchPostRaw extends ResearchPost {
  title_es?: string
  title_zh?: string
  subtitle_es?: string
  subtitle_zh?: string
  executive_summary_es?: string
  executive_summary_zh?: string
}

function localizePost(post: ResearchPostRaw, locale: string): ResearchPost {
  const title =
    (locale === 'es' && post.title_es) ||
    (locale === 'zh' && post.title_zh) ||
    post.title
  const subtitle =
    (locale === 'es' && post.subtitle_es) ||
    (locale === 'zh' && post.subtitle_zh) ||
    post.subtitle
  const executive_summary =
    (locale === 'es' && post.executive_summary_es) ||
    (locale === 'zh' && post.executive_summary_zh) ||
    post.executive_summary
  const { title_es, title_zh, subtitle_es, subtitle_zh, executive_summary_es, executive_summary_zh, ...rest } = post
  return { ...rest, title, subtitle: subtitle || undefined, executive_summary }
}

export interface Investor {
  id: string
  email: string
  investor_name: string
  investment_amount: number
  currency: string
  investment_date: string
  wallet_address: string
  status: 'active' | 'pending' | 'closed'
}

export async function getPublishedResearchPosts(locale = 'en'): Promise<ResearchPost[]> {
  if (!BASE) return []
  try {
    const res = await fetch(
      `${BASE}/items/research_posts?filter[status][_eq]=published&sort=-publish_date`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const json = await res.json()
    const posts: ResearchPostRaw[] = json.data ?? []
    return posts.map((p) => localizePost(p, locale))
  } catch {
    return []
  }
}

export async function getResearchPostBySlug(slug: string, locale = 'en'): Promise<ResearchPost | null> {
  if (!BASE) return null
  try {
    const res = await fetch(
      `${BASE}/items/research_posts?filter[slug][_eq]=${encodeURIComponent(slug)}&filter[status][_eq]=published&limit=1`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    const json = await res.json()
    const post: ResearchPostRaw | undefined = json.data?.[0]
    return post ? localizePost(post, locale) : null
  } catch {
    return null
  }
}

// Auth functions

export async function loginUser(email: string, password: string) {
  if (!BASE) throw new Error('Directus not configured')
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.errors?.[0]?.message ?? 'Login failed')
  }
  const json = await res.json()
  return json.data as { access_token: string; refresh_token: string; expires: number }
}

export async function logoutUser(refreshToken: string) {
  if (!BASE) return
  await fetch(`${BASE}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  }).catch(() => {})
}

export async function getCurrentUser(token: string) {
  if (!BASE) return null
  try {
    const res = await fetch(`${BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = await res.json()
    const data = json.data
    return {
      id: data?.id,
      email: data?.email,
      first_name: data?.first_name,
      last_name: data?.last_name,
      admin_access: data?.role?.admin_access === true,
    } as { id: string; email: string; first_name?: string; last_name?: string; admin_access?: boolean }
  } catch {
    return null
  }
}

export async function getInvestorByEmail(email: string): Promise<Investor | null> {
  if (!BASE || !TOKEN) return null
  try {
    const res = await fetch(
      `${BASE}/items/investors?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
        cache: 'no-store',
      }
    )
    if (!res.ok) return null
    const json = await res.json()
    return json.data?.[0] ?? null
  } catch {
    return null
  }
}
