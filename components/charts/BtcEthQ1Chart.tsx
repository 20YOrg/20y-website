'use client'

import { useEffect, useRef } from 'react'

export default function BtcEthQ1Chart() {
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
        type: 'line',
        data: {
          labels: ['Jan 1','Jan 8','Jan 15','Jan 22','Jan 31','Feb 7','Feb 14','Feb 21','Feb 28','Mar 7','Mar 14','Mar 21','Mar 31'],
          datasets: [
            {
              label: 'BTC',
              data: [100,97,99,95,89.8,86,82,79,85.1,83,80,78,76.8],
              borderColor: '#a0622a',
              backgroundColor: 'rgba(160,98,42,0.07)',
              borderWidth: 2,
              pointRadius: 3,
              fill: true,
              tension: 0.35,
            },
            {
              label: 'ETH',
              data: [100,95,97,90,84,79,73,68,72,69,65,63,67.8],
              borderColor: '#627eea',
              backgroundColor: 'rgba(98,126,234,0.07)',
              borderWidth: 2,
              pointRadius: 3,
              fill: true,
              tension: 0.35,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: GRID, ticks: TICK },
            y: { min: 55, max: 105, grid: GRID, ticks: TICK },
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
        BTC &amp; ETH — Q1 2026 Price Performance
      </h3>
      <p style={{ fontSize: 11, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
        Indexed to 100 at January 1, 2026
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'BTC Q1 return', value: '−23.2%', red: true },
          { label: 'ETH Q1 return', value: '−32.2%', red: true },
          { label: 'BTC close (Mar 31)', value: '~$67,500', red: false },
          { label: 'Total mkt cap lost', value: '−$900B', red: true },
        ].map((s) => (
          <div key={s.label} style={{ border: '1px solid #e5e5e5', padding: '8px 14px', minWidth: 110 }}>
            <div style={{ fontSize: 10, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1, color: s.red ? '#8b2020' : '#1a1a1a' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 10, fontSize: 11, color: '#7a7a7a' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 9, height: 9, borderRadius: 1, background: '#a0622a', display: 'inline-block' }} />
          Bitcoin (BTC)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 9, height: 9, borderRadius: 1, background: '#627eea', display: 'inline-block' }} />
          Ethereum (ETH)
        </span>
      </div>

      <div style={{ border: '1px solid #e5e5e5', padding: '16px 16px 10px' }}>
        <div style={{ position: 'relative', height: 280 }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
      <p style={{ fontSize: 10, color: '#7a7a7a', marginTop: 6, textAlign: 'right' }}>
        Source: CoinGlass · Indexed to 100 at Jan 1, 2026
      </p>
    </div>
  )
}
