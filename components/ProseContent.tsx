'use client'

import { useEffect, useRef } from 'react'

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

  return (
    <div
      ref={ref}
      className="prose-content"
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 16,
        color: '#4a4a4a',
        lineHeight: 1.75,
        marginBottom: 32,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
