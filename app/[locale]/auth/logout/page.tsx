'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

function localePath(locale: string, path: string) {
  if (locale === 'en') return path
  return `/${locale}${path === '/' ? '' : path}`
}

export default function LogoutPage() {
  const router = useRouter()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  useEffect(() => {
    fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
      router.push(localePath(locale, '/'))
      router.refresh()
    })
  }, [locale, router])

  return null
}
