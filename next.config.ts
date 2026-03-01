import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const directusHostname = process.env.NEXT_PUBLIC_DIRECTUS_URL
  ? new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL).hostname
  : ''

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: directusHostname
      ? [{ protocol: 'https', hostname: directusHostname }]
      : [],
  },
}

export default withNextIntl(nextConfig)
