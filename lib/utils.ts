export function formatDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

export function addYears(dateString: string, years: number): string {
  const date = new Date(dateString)
  date.setFullYear(date.getFullYear() + years)
  return date.toISOString().split('T')[0]
}

export function monthsRemaining(targetDate: string): number {
  const now = new Date()
  const target = new Date(targetDate)
  const months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth())
  return Math.max(0, months)
}
