'use client'

import { useEffect, useRef } from 'react'

export default function GlobalAssetsChart() {
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

      const assets = [
        { label: 'Real estate',    value: 326.0, color: '#C8C8C8' },
        { label: 'Bonds',          value: 133.0, color: '#C8C8C8' },
        { label: 'Stock markets',  value: 109.0, color: '#C8C8C8' },
        { label: 'Gold',           value: 21.0,  color: '#C8C8C8' },
        { label: 'Crypto (total)', value: 2.7,   color: '#378ADD' },
      ]

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: assets.map((a) => a.label),
          datasets: [{
            data: assets.map((a) => a.value),
            backgroundColor: assets.map((a) => a.color),
            borderWidth: 0,
            borderRadius: 2,
            barThickness: 22,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const v = ctx.parsed.x ?? 0
                  return ` $${v >= 1 ? (v as number).toFixed(1) : (v as number).toFixed(2)}T`
                }
              }
            }
          },
          scales: {
            x: {
              type: 'logarithmic',
              min: 1,
              max: 600,
              ticks: {
                callback: (v) => {
                  if (v == null) return ''
                  const labels: Record<number, string> = {
                    1: '$1T', 10: '$10T', 100: '$100T'
                  }
                  return labels[v as number] ?? ''
                },
                font: { size: 11 },
                color: '#888780',
              },
              grid: { color: 'rgba(136,135,128,0.10)' }
            },
            y: {
              ticks: {
                font: { size: 12 },
                color: '#4a4a4a',
              },
              grid: { display: false }
            }
          }
        }
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
    <div style={{ padding: '1.5rem 0 1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16, fontSize: 12, color: '#888780' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: '#378ADD', display: 'inline-block' }} />
          Crypto
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: '#C8C8C8', display: 'inline-block' }} />
          Other asset classes
        </span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 240 }}>
        <canvas ref={canvasRef} />
      </div>
      <p style={{ fontSize: 11, color: '#888780', marginTop: 10, lineHeight: 1.5 }}>
        Approximate figures in USD trillions. Crypto market cap as of early 2026. Real estate, bonds, and equities based on 2024 estimates. Log scale used for readability. Sources: Visual Capitalist, World Bank, SIFMA, CoinMarketCap.
      </p>
    </div>
  )
}
