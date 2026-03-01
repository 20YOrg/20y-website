const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.DIRECTUS_TOKEN

export interface ResearchPost {
  id: string
  slug: string
  title: string
  publish_date: string
  executive_summary: string
  video_url?: string
  framework_image?: string
  status: 'published' | 'draft'
}

export interface Investor {
  id: string
  email: string
  investor_name: string
  investment_amount: number
  investment_date: string
  wallet_address: string
  status: 'active' | 'pending' | 'closed'
}

export async function getPublishedResearchPosts(): Promise<ResearchPost[]> {
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
    return json.data ?? []
  } catch {
    return []
  }
}

export async function getResearchPostBySlug(slug: string): Promise<ResearchPost | null> {
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
    return json.data?.[0] ?? null
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
    return json.data as { id: string; email: string; first_name?: string; last_name?: string }
  } catch {
    return null
  }
}

export async function getInvestorByEmail(email: string, token: string): Promise<Investor | null> {
  if (!BASE) return null
  try {
    const res = await fetch(
      `${BASE}/items/investors?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
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
