'use client'

import type { ComponentType } from 'react'
import BtcEthQ1Chart from './charts/BtcEthQ1Chart'
import FearGreedQ1Chart from './charts/FearGreedQ1Chart'
import HyperliquidQ1Chart from './charts/HyperliquidQ1Chart'
import GlobalAssetsChart from './charts/GlobalAssetsChart'
import HalvingTimelineChart from './charts/HalvingTimelineChart'

/* ── Chart registry ───────────────────────────────────────
   To add a new chart:
   1. Create components/charts/YourChart.tsx
   2. Import it above
   3. Add an entry here: 'your-chart-name': YourChart
─────────────────────────────────────────────────────────── */
const CHARTS: Record<string, ComponentType> = {
  'btc-eth-q1':        BtcEthQ1Chart,
  'fear-greed-q1':     FearGreedQ1Chart,
  'hyperliquid-q1':    HyperliquidQ1Chart,
  'global-assets':     GlobalAssetsChart,
  'halving-timeline':  HalvingTimelineChart,
}

const SHORTCODE = /\{\{chart:([^}]+)\}\}/g

export default function ReportContent({ html }: { html: string }) {
  // Split content by {{chart:xxx}} placeholders
  const parts = html.split(SHORTCODE)
  // parts alternates: htmlString, chartName, htmlString, chartName, ...

  return (
    <div className="report-content">
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          // odd indexes are chart names
          const name = part.trim()
          const ChartComponent = CHARTS[name]
          if (!ChartComponent) {
            // Unknown chart — show a placeholder so authors know the name is wrong
            return (
              <div key={i} style={{
                border: '1px dashed #e5e5e5',
                padding: '16px',
                margin: '24px 0',
                fontSize: 12,
                color: '#7a7a7a',
                fontFamily: 'var(--font-sans)',
              }}>
                Chart not found: <code>{name}</code>
              </div>
            )
          }
          return <ChartComponent key={i} />
        }
        // even indexes are HTML content
        if (!part) return null
        return <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
      })}
    </div>
  )
}
