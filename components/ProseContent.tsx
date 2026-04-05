'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

function ChartPlaceholder() {
  return (
    <div style={{
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbbbbb',
      fontSize: 13,
      fontFamily: 'var(--font-sans)',
    }}>
      Loading chart…
    </div>
  )
}

const CHART_COMPONENTS: Record<string, React.ComponentType> = {
  'halving-timeline': dynamic(() => import('./charts/HalvingTimelineChart'), { ssr: false, loading: ChartPlaceholder }),
  'global-assets':    dynamic(() => import('./charts/GlobalAssetsChart'),    { ssr: false, loading: ChartPlaceholder }),
}

function parseSegments(html: string): Array<{ type: 'html'; content: string } | { type: 'chart'; id: string }> {
  const segments: Array<{ type: 'html'; content: string } | { type: 'chart'; id: string }> = []
  const regex = /\{\{chart:([a-z0-9-]+)\}\}/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    if (match.index > last) {
      segments.push({ type: 'html', content: html.slice(last, match.index) })
    }
    segments.push({ type: 'chart', id: match[1] })
    last = match.index + match[0].length
  }

  if (last < html.length) {
    segments.push({ type: 'html', content: html.slice(last) })
  }

  return segments
}

export default function ProseContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const imgs = ref.current.querySelectorAll('img')
    imgs.forEach((img) => {
      img.style.opacity = '0'
      img.style.transition = 'opacity 0.4s ease'
      if (img.complete) {
        img.style.opacity = '1'
      } else {
        img.onload = () => { img.style.opacity = '1' }
      }
    })
  }, [html])

  const segments = parseSegments(html)
  const hasCharts = segments.some((s) => s.type === 'chart')

  const sharedStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 1.75,
    marginBottom: 32,
  }

  if (!hasCharts) {
    return (
      <div
        ref={ref}
        className="prose-content"
        style={sharedStyle}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div ref={ref} className="prose-content" style={sharedStyle}>
      {segments.map((seg, i) => {
        if (seg.type === 'html') {
          return seg.content.trim()
            ? <div key={i} dangerouslySetInnerHTML={{ __html: seg.content }} />
            : null
        }
        const ChartComponent = CHART_COMPONENTS[seg.id]
        if (!ChartComponent) return null
        return <ChartComponent key={i} />
      })}
    </div>
  )
}
