'use client'

import { useEffect, useRef } from 'react'

export default function HyperliquidQ1Chart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<unknown>(null)

  useEffect(() => {
    let destroyed = false

    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (destroyed || !canvasRef.current) return
      if (chartRef.current) {
        ;(chartRef.current as InstanceType<typeof Chart>).destroy()
      }

      const TICK = { font: { size: 11, family: 'Inter' }, color: '#7a7a7a' }
      const GRID = { color: 'rgba(0,0,0,0.06)' }

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: ['Q1 2024','Q2 2024','Q3 2024','Q4 2024','Q1 2025','Q2 2025','Q3 2025','Q4 2025','Q1 2026'],
          datasets: [
            {
              label: 'Monthly revenue ($M)',
              data: [2, 4, 6, 10, 18, 45, 87, 60, 50],
              backgroundColor: 'rgba(160,98,42,0.80)',
              borderRadius: 3,
              yAxisID: 'y',
            },
            {
              label: 'Perp DEX share (%)',
              data: [12, 18, 24, 30, 34, 38, 42, 38, 44],
              type: 'line' as const,
              borderColor: '#627eea',
              backgroundColor: 'rgba(98,126,234,0.08)',
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: '#627eea',
              fill: true,
              tension: 0.35,
              yAxisID: 'y2',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: TICK },
            y: {
              position: 'left' as const,
              grid: GRID,
              ticks: { ...TICK, color: '#a0622a', callback: (v) => `$${v}M` },
            },
            y2: {
              position: 'right' as const,
              grid: { drawOnChartArea: false },
              min: 0,
              max: 60,
              ticks: { ...TICK, color: '#627eea', callback: (v) => `${v}%` },
            },
          },
        },
      })
    }

    init()
    return () => {
      destroyed = true
      if (chartRef.current) {
        ;(chartRef.current as { destroy: () => void }).destroy()
        chartRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ margin: '32px 0' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: '#1a1a1a', marginBottom: 4 }}>
        Hyperliquid — Perp DEX Market Share &amp; Protocol Revenue
      </h3>
      <p style={{ fontSize: 11, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
        Q1 2024 through Q1 2026 · Quarterly
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'DEX share Jan 2026', value: '36.4%', green: false },
          { label: 'DEX share Mar 2026', value: '44%', green: true },
          { label: 'Active users', value: '25,000', green: false },
          { label: 'Annualised revenue', value: '$600M+', green: false },
        ].map((s) => (
          <div key={s.label} style={{ border: '1px solid #e5e5e5', padding: '8px 14px', minWidth: 110 }}>
            <div style={{ fontSize: 10, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1, color: s.green ? '#2a6b3a' : '#1a1a1a' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 10, fontSize: 11, color: '#7a7a7a' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 9, height: 9, borderRadius: 1, background: '#a0622a', display: 'inline-block' }} />
          Monthly protocol revenue ($M)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 9, height: 9, borderRadius: 1, background: '#627eea', display: 'inline-block' }} />
          Perp DEX market share (%)
        </span>
      </div>

      <div style={{ border: '1px solid #e5e5e5', padding: '16px 16px 10px' }}>
        <div style={{ position: 'relative', height: 280 }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
      <p style={{ fontSize: 10, color: '#7a7a7a', marginTop: 6, textAlign: 'right' }}>
        Source: DWF Ventures · KuCoin · BeInCrypto · Dune Analytics
      </p>
    </div>
  )
}
