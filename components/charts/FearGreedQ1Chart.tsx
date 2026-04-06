'use client'

import { useEffect, useRef } from 'react'

const DATA: [string, number][] = [
  ['Jan 7',42],['Jan 8',28],['Jan 9',27],['Jan 10',25],['Jan 11',29],
  ['Jan 12',27],['Jan 13',26],['Jan 14',48],['Jan 15',61],['Jan 16',49],
  ['Jan 17',50],['Jan 18',49],['Jan 19',44],['Jan 20',32],['Jan 21',24],
  ['Jan 22',20],['Jan 23',24],['Jan 24',25],['Jan 25',25],['Jan 26',20],
  ['Jan 27',29],['Jan 28',29],['Jan 29',26],['Jan 30',16],['Jan 31',20],
  ['Feb 1',14],['Feb 2',14],['Feb 3',17],['Feb 4',14],['Feb 5',12],
  ['Feb 6',9],['Feb 7',6],['Feb 8',7],['Feb 9',14],['Feb 10',9],
  ['Feb 11',11],['Feb 12',5],['Feb 13',9],['Feb 14',9],['Feb 15',8],
  ['Feb 16',12],['Feb 17',10],['Feb 18',8],['Feb 19',9],['Feb 20',7],
  ['Feb 21',8],['Feb 22',9],['Feb 23',5],['Feb 24',8],['Feb 25',11],
  ['Feb 26',11],['Feb 27',13],['Feb 28',11],['Mar 1',14],['Mar 2',10],
  ['Mar 3',14],['Mar 4',10],['Mar 5',22],['Mar 6',18],['Mar 7',12],
  ['Mar 8',12],['Mar 9',8],['Mar 10',13],['Mar 11',15],['Mar 12',18],
  ['Mar 13',15],['Mar 14',16],['Mar 15',15],['Mar 16',23],['Mar 17',28],
  ['Mar 18',26],['Mar 19',23],['Mar 20',11],['Mar 21',12],['Mar 22',10],
  ['Mar 23',8],['Mar 24',11],['Mar 25',14],['Mar 26',10],['Mar 27',13],
  ['Mar 28',12],['Mar 29',9],['Mar 30',8],['Mar 31',11],
]

function color(v: number) {
  if (v <= 24) return '#8b2020'
  if (v <= 44) return '#a0622a'
  if (v <= 55) return '#7a6e62'
  return '#2a6b3a'
}

function label(v: number) {
  if (v <= 24) return 'Extreme Fear'
  if (v <= 44) return 'Fear'
  if (v <= 55) return 'Neutral'
  return 'Greed'
}

export default function FearGreedQ1Chart() {
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
          labels: DATA.map((d) => d[0]),
          datasets: [{
            data: DATA.map((d) => d[1]),
            backgroundColor: DATA.map((d) => color(d[1])),
            borderRadius: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const v = ctx.parsed.y ?? 0
                  return `${v} — ${label(v)}`
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { ...TICK, font: { size: 9, family: 'Inter' }, maxRotation: 45, autoSkip: true, maxTicksLimit: 18 },
            },
            y: { min: 0, max: 70, grid: GRID, ticks: TICK },
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
        Crypto Fear &amp; Greed Index — Daily Q1 2026
      </h3>
      <p style={{ fontSize: 11, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
        Sentiment composite · 0 = Extreme Fear · 100 = Extreme Greed
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Q1 high', value: '61', sub: 'Jan 15 — Greed', green: true },
          { label: 'Q1 low', value: '5', sub: 'Feb 12 & 23', red: true },
          { label: 'Mar 31 close', value: '11', sub: 'Extreme Fear', red: true },
        ].map((s) => (
          <div key={s.label} style={{ border: '1px solid #e5e5e5', padding: '8px 14px', minWidth: 110 }}>
            <div style={{ fontSize: 10, color: '#7a7a7a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1, color: s.red ? '#8b2020' : s.green ? '#2a6b3a' : '#1a1a1a' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#7a7a7a', marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 10, fontSize: 11, color: '#7a7a7a' }}>
        {[
          { c: '#8b2020', l: 'Extreme Fear (0–24)' },
          { c: '#a0622a', l: 'Fear (25–44)' },
          { c: '#7a6e62', l: 'Neutral (45–55)' },
          { c: '#2a6b3a', l: 'Greed (56–74)' },
        ].map((item) => (
          <span key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 1, background: item.c, display: 'inline-block' }} />
            {item.l}
          </span>
        ))}
      </div>

      <div style={{ border: '1px solid #e5e5e5', padding: '16px 16px 10px' }}>
        <div style={{ position: 'relative', height: 260 }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
      <p style={{ fontSize: 10, color: '#7a7a7a', marginTop: 6, textAlign: 'right' }}>
        Source: alternative.me · Raw API data
      </p>
    </div>
  )
}
