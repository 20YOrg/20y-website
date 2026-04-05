'use client'

import { useEffect, useRef } from 'react'

export default function HalvingTimelineChart() {
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

      function ym(y: number, m: number) { return y + (m - 1) / 12 }

      const priceData = [
        {x: ym(2010,7),  y: 0.05},  {x: ym(2010,8),  y: 0.07},  {x: ym(2010,9),  y: 0.07},
        {x: ym(2010,10), y: 0.12},  {x: ym(2010,11), y: 0.25},  {x: ym(2010,12), y: 0.30},
        {x: ym(2011,1),  y: 0.31},  {x: ym(2011,2),  y: 1.00},  {x: ym(2011,3),  y: 0.90},
        {x: ym(2011,4),  y: 1.80},  {x: ym(2011,5),  y: 8.50},  {x: ym(2011,6),  y: 29.6},
        {x: ym(2011,7),  y: 13.5},  {x: ym(2011,8),  y: 10.0},  {x: ym(2011,9),  y: 5.00},
        {x: ym(2011,10), y: 3.50},  {x: ym(2011,11), y: 2.40},  {x: ym(2011,12), y: 4.70},
        {x: ym(2012,1),  y: 6.20},  {x: ym(2012,2),  y: 4.90},  {x: ym(2012,3),  y: 4.90},
        {x: ym(2012,4),  y: 5.00},  {x: ym(2012,5),  y: 5.10},  {x: ym(2012,6),  y: 6.70},
        {x: ym(2012,7),  y: 7.10},  {x: ym(2012,8),  y: 10.0},  {x: ym(2012,9),  y: 12.4},
        {x: ym(2012,10), y: 10.9},  {x: ym(2012,11), y: 12.56}, {x: ym(2012,12), y: 13.50},
        {x: ym(2013,1),  y: 20.0},  {x: ym(2013,2),  y: 28.0},  {x: ym(2013,3),  y: 92.0},
        {x: ym(2013,4),  y: 133},   {x: ym(2013,5),  y: 129},   {x: ym(2013,6),  y: 100},
        {x: ym(2013,7),  y: 90},    {x: ym(2013,8),  y: 105},   {x: ym(2013,9),  y: 130},
        {x: ym(2013,10), y: 198},   {x: ym(2013,11), y: 946},   {x: ym(2013,12), y: 805},
        {x: ym(2014,1),  y: 820},   {x: ym(2014,2),  y: 550},   {x: ym(2014,3),  y: 450},
        {x: ym(2014,4),  y: 444},   {x: ym(2014,5),  y: 440},   {x: ym(2014,6),  y: 620},
        {x: ym(2014,7),  y: 580},   {x: ym(2014,8),  y: 490},   {x: ym(2014,9),  y: 390},
        {x: ym(2014,10), y: 340},   {x: ym(2014,11), y: 370},   {x: ym(2014,12), y: 318},
        {x: ym(2015,1),  y: 220},   {x: ym(2015,2),  y: 260},   {x: ym(2015,3),  y: 254},
        {x: ym(2015,4),  y: 240},   {x: ym(2015,5),  y: 235},   {x: ym(2015,6),  y: 260},
        {x: ym(2015,7),  y: 285},   {x: ym(2015,8),  y: 230},   {x: ym(2015,9),  y: 236},
        {x: ym(2015,10), y: 315},   {x: ym(2015,11), y: 378},   {x: ym(2015,12), y: 430},
        {x: ym(2016,1),  y: 380},   {x: ym(2016,2),  y: 437},   {x: ym(2016,3),  y: 415},
        {x: ym(2016,4),  y: 450},   {x: ym(2016,5),  y: 530},   {x: ym(2016,6),  y: 700},
        {x: ym(2016,7),  y: 650},   {x: ym(2016,8),  y: 578},   {x: ym(2016,9),  y: 613},
        {x: ym(2016,10), y: 703},   {x: ym(2016,11), y: 740},   {x: ym(2016,12), y: 963},
        {x: ym(2017,1),  y: 1000},  {x: ym(2017,2),  y: 1190},  {x: ym(2017,3),  y: 1070},
        {x: ym(2017,4),  y: 1340},  {x: ym(2017,5),  y: 2300},  {x: ym(2017,6),  y: 2560},
        {x: ym(2017,7),  y: 2870},  {x: ym(2017,8),  y: 4700},  {x: ym(2017,9),  y: 4200},
        {x: ym(2017,10), y: 6100},  {x: ym(2017,11), y: 10800}, {x: ym(2017,12), y: 14156},
        {x: ym(2018,1),  y: 10300}, {x: ym(2018,2),  y: 10500}, {x: ym(2018,3),  y: 7000},
        {x: ym(2018,4),  y: 9300},  {x: ym(2018,5),  y: 7500},  {x: ym(2018,6),  y: 6200},
        {x: ym(2018,7),  y: 8200},  {x: ym(2018,8),  y: 7000},  {x: ym(2018,9),  y: 6600},
        {x: ym(2018,10), y: 6300},  {x: ym(2018,11), y: 4000},  {x: ym(2018,12), y: 3693},
        {x: ym(2019,1),  y: 3600},  {x: ym(2019,2),  y: 3800},  {x: ym(2019,3),  y: 4100},
        {x: ym(2019,4),  y: 5300},  {x: ym(2019,5),  y: 8700},  {x: ym(2019,6),  y: 13000},
        {x: ym(2019,7),  y: 10000}, {x: ym(2019,8),  y: 9600},  {x: ym(2019,9),  y: 8300},
        {x: ym(2019,10), y: 9200},  {x: ym(2019,11), y: 7500},  {x: ym(2019,12), y: 7200},
        {x: ym(2020,1),  y: 9350},  {x: ym(2020,2),  y: 8700},  {x: ym(2020,3),  y: 6400},
        {x: ym(2020,4),  y: 8600},  {x: ym(2020,5),  y: 9650},  {x: ym(2020,6),  y: 9100},
        {x: ym(2020,7),  y: 11350}, {x: ym(2020,8),  y: 11650}, {x: ym(2020,9),  y: 10800},
        {x: ym(2020,10), y: 13800}, {x: ym(2020,11), y: 19700}, {x: ym(2020,12), y: 29000},
        {x: ym(2021,1),  y: 33100}, {x: ym(2021,2),  y: 46200}, {x: ym(2021,3),  y: 58800},
        {x: ym(2021,4),  y: 57800}, {x: ym(2021,5),  y: 37300}, {x: ym(2021,6),  y: 35000},
        {x: ym(2021,7),  y: 41500}, {x: ym(2021,8),  y: 47100}, {x: ym(2021,9),  y: 43800},
        {x: ym(2021,10), y: 61400}, {x: ym(2021,11), y: 57000}, {x: ym(2021,12), y: 46200},
        {x: ym(2022,1),  y: 38500}, {x: ym(2022,2),  y: 43200}, {x: ym(2022,3),  y: 45500},
        {x: ym(2022,4),  y: 37600}, {x: ym(2022,5),  y: 31800}, {x: ym(2022,6),  y: 19800},
        {x: ym(2022,7),  y: 23400}, {x: ym(2022,8),  y: 20000}, {x: ym(2022,9),  y: 19400},
        {x: ym(2022,10), y: 20500}, {x: ym(2022,11), y: 16500}, {x: ym(2022,12), y: 16600},
        {x: ym(2023,1),  y: 23100}, {x: ym(2023,2),  y: 23500}, {x: ym(2023,3),  y: 28500},
        {x: ym(2023,4),  y: 29600}, {x: ym(2023,5),  y: 27700}, {x: ym(2023,6),  y: 30500},
        {x: ym(2023,7),  y: 29300}, {x: ym(2023,8),  y: 26000}, {x: ym(2023,9),  y: 26900},
        {x: ym(2023,10), y: 34700}, {x: ym(2023,11), y: 37700}, {x: ym(2023,12), y: 42300},
        {x: ym(2024,1),  y: 46000}, {x: ym(2024,2),  y: 62300}, {x: ym(2024,3),  y: 71300},
        {x: ym(2024,4),  y: 64968}, {x: ym(2024,5),  y: 67600}, {x: ym(2024,6),  y: 62700},
        {x: ym(2024,7),  y: 66000}, {x: ym(2024,8),  y: 59000}, {x: ym(2024,9),  y: 63300},
        {x: ym(2024,10), y: 72400}, {x: ym(2024,11), y: 97500}, {x: ym(2024,12), y: 93400},
        {x: ym(2025,1),  y: 105000},{x: ym(2025,2),  y: 86000}, {x: ym(2025,3),  y: 83000},
        {x: ym(2025,4),  y: 76000}, {x: ym(2025,5),  y: 104000},{x: ym(2025,6),  y: 107000},
        {x: ym(2025,7),  y: 98000}, {x: ym(2025,8),  y: 102000},{x: ym(2025,9),  y: 96000},
        {x: ym(2025,10), y: 126000},{x: ym(2025,11), y: 98000}, {x: ym(2025,12), y: 93000},
        {x: ym(2026,1),  y: 104000},{x: ym(2026,2),  y: 85000}, {x: ym(2026,3),  y: 82000},
        {x: ym(2026,4),  y: 67000},
      ]

      const halvings = [
        { x: ym(2012, 11) + 28/365, label: 'Nov 2012\n$12' },
        { x: ym(2016, 7)  + 9/365,  label: 'Jul 2016\n$650' },
        { x: ym(2020, 5)  + 11/365, label: 'May 2020\n$8.6k' },
        { x: ym(2024, 4)  + 20/365, label: 'Apr 2024\n$65k' },
      ]

      const projected = [
        { x: ym(2028, 4), label: '~Apr 2028' },
        { x: ym(2032, 4), label: '~Apr 2032' },
        { x: ym(2036, 4), label: '~Apr 2036' },
        { x: ym(2040, 4), label: '~Apr 2040' },
      ]

      // Custom plugin: draw vertical halving lines directly on canvas
      const halvingLinesPlugin = {
        id: 'halvingLines',
        afterDraw(chart: InstanceType<typeof Chart>) {
          const ctx = chart.ctx
          const xScale = chart.scales['x']
          const yScale = chart.scales['y']
          if (!xScale || !yScale) return

          const top = yScale.top
          const bottom = yScale.bottom

          // Confirmed halvings — solid red
          ctx.save()
          halvings.forEach((h) => {
            const px = xScale.getPixelForValue(h.x)
            ctx.beginPath()
            ctx.moveTo(px, top)
            ctx.lineTo(px, bottom)
            ctx.strokeStyle = '#E24B4A'
            ctx.lineWidth = 1.5
            ctx.setLineDash([])
            ctx.stroke()

            // Label (two lines)
            const lines = h.label.split('\n')
            ctx.font = '9px Inter, sans-serif'
            ctx.fillStyle = '#E24B4A'
            ctx.textAlign = 'left'
            lines.forEach((line, i) => {
              ctx.fillText(line, px + 4, top + 14 + i * 12)
            })
          })

          // Projected halvings — dashed gray
          projected.forEach((p) => {
            const px = xScale.getPixelForValue(p.x)
            ctx.beginPath()
            ctx.moveTo(px, top)
            ctx.lineTo(px, bottom)
            ctx.strokeStyle = '#B4B2A9'
            ctx.lineWidth = 1
            ctx.setLineDash([5, 4])
            ctx.stroke()

            ctx.font = '9px Inter, sans-serif'
            ctx.fillStyle = '#888780'
            ctx.textAlign = 'left'
            ctx.setLineDash([])
            ctx.fillText(p.label, px + 4, top + 14)
          })

          ctx.restore()
        }
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: 'scatter',
        data: {
          datasets: [{
            data: priceData,
            borderColor: '#378ADD',
            borderWidth: 1.8,
            pointRadius: 0,
            showLine: true,
            tension: 0.2,
          }]
        },
        plugins: [halvingLinesPlugin],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'nearest',
              intersect: false,
              callbacks: {
                title: (ctx) => {
                  const v = ctx[0].parsed.x ?? 0
                  const y = Math.floor(v)
                  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                  const m = Math.round((v - y) * 12)
                  return months[Math.min(m, 11)] + ' ' + y
                },
                label: (ctx) => {
                  const v = ctx.parsed.y ?? 0
                  if (v >= 1000000) return ' $' + (v/1000000).toFixed(1) + 'M'
                  if (v >= 1000) return ' $' + Math.round(v/1000) + 'k'
                  return ' $' + v.toFixed(2)
                }
              }
            }
          },
          scales: {
            x: {
              type: 'linear', min: 2010.5, max: 2045,
              ticks: {
                stepSize: 4,
                callback: (v) => Number.isInteger(Number(v)) ? v : '',
                font: { size: 11 }, color: '#888780', maxRotation: 0,
              },
              grid: { color: 'rgba(136,135,128,0.10)' }
            },
            y: {
              type: 'logarithmic', min: 0.03, max: 10000000,
              ticks: {
                callback: (v) => {
                  const labels: Record<number, string> = {
                    0.1: '$0.10', 1: '$1', 10: '$10', 100: '$100',
                    1000: '$1k', 10000: '$10k', 100000: '$100k',
                    1000000: '$1M', 10000000: '$10M'
                  }
                  return labels[v as number] ?? ''
                },
                font: { size: 11 }, color: '#888780',
              },
              grid: { color: 'rgba(136,135,128,0.10)' }
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
          BTC price (log scale, USD)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 3, background: '#E24B4A', display: 'inline-block' }} />
          Confirmed halvings
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 0, borderTop: '2px dashed #B4B2A9', display: 'inline-block' }} />
          Projected halvings
        </span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 420 }}>
        <canvas ref={canvasRef} />
      </div>
      <p style={{ fontSize: 11, color: '#888780', marginTop: 10, lineHeight: 1.5 }}>
        Monthly closing prices sourced from CoinMarketCap, Kraken, Yahoo Finance, Bankrate. Exact halving prices: Nov 28 2012 $12.22 · Jul 9 2016 $650 · May 11 2020 $8,570 · Apr 20 2024 $64,968. Current price as of Apr 5, 2026 ~$67,000. Projected halvings for illustrative purposes only.
      </p>
    </div>
  )
}
