'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1)
}

function ease(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

interface Props {
  headline: string
  tagline: string
  subtitle: string
  mission: string
}

export default function HomeAnimation({ headline, tagline, subtitle, mission }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    let vw = window.innerWidth
    let vh = window.innerHeight

    function calc(p: number) {
      const ep = ease(p)
      const isMobile = vw < 640
      const hPad = vw >= 768 ? 32 : 20
      const containerW = Math.min(vw - hPad * 2, 800)
      const containerL = Math.max(hPad, (vw - 800) / 2)

      const startSize = Math.min(vw * 1.0, 1100)
      const endSize = isMobile ? Math.min(vw * 0.44, 190) : Math.min(containerW * 0.38, 260)
      const currentSize = lerp(startSize, endSize, ep)

      const startCX = vw / 2
      const endCX = isMobile ? vw / 2 : containerL + endSize / 2
      const currentCX = lerp(startCX, endCX, ep)

      // Start: center of circle at the very bottom of viewport (half hidden)
      // End: center at 48% of viewport height
      const startCY = vh + startSize * 0.08
      const endCY = isMobile ? vh * 0.44 : vh * 0.50
      const currentCY = lerp(startCY, endCY, ep)

      const missionL = isMobile ? hPad : containerL + endSize + 28
      const missionW = isMobile ? containerW : containerW - endSize - 28
      const missionTop = isMobile ? endCY + endSize / 2 + 20 : vh * 0.50 - 72

      return {
        imgLeft: currentCX - currentSize / 2,
        imgTop: currentCY - currentSize / 2,
        imgSize: currentSize,
        heroOpacity: lerp(1, 0.08, ep),
        heroTranslate: -ep * 16,
        missionOpacity: Math.max(0, ep * 2.8 - 1.0),
        missionL, missionW, missionTop,
      }
    }

    function apply(p: number) {
      const c = calc(p)
      if (imgRef.current) {
        imgRef.current.style.left = `${c.imgLeft}px`
        imgRef.current.style.top = `${c.imgTop}px`
        imgRef.current.style.width = `${c.imgSize}px`
        imgRef.current.style.height = `${c.imgSize}px`
      }
      if (heroRef.current) {
        heroRef.current.style.opacity = `${c.heroOpacity}`
        heroRef.current.style.transform = `translateY(${c.heroTranslate}px)`
      }
      if (missionRef.current) {
        missionRef.current.style.opacity = `${c.missionOpacity}`
        missionRef.current.style.left = `${c.missionL}px`
        missionRef.current.style.width = `${c.missionW}px`
        missionRef.current.style.top = `${c.missionTop}px`
      }
    }

    function onScroll() {
      if (!scrollRef.current) return
      const rect = scrollRef.current.getBoundingClientRect()
      const scrollable = scrollRef.current.offsetHeight - vh
      const p = Math.max(0, Math.min(1, -rect.top / scrollable))
      apply(p)
    }

    function onResize() {
      vw = window.innerWidth
      vh = window.innerHeight
      onScroll()
    }

    apply(0)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={scrollRef} style={{ height: '170vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Hero text — upper area */}
        <div
          ref={heroRef}
          style={{
            textAlign: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            position: 'relative',
            zIndex: 2,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 'clamp(100px, 22vh, 180px)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 4.5vw, 48px)',
              fontWeight: 400,
              color: '#1a1a1a',
              lineHeight: 1.1,
              marginBottom: 20,
              whiteSpace: 'nowrap',
            }}
          >
            {headline}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#4a4a4a', lineHeight: 1.75, marginBottom: 4 }}>
            {tagline}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#4a4a4a', lineHeight: 1.75 }}>
            {subtitle}
          </p>
        </div>

        {/* Animated image */}
        <div
          ref={imgRef}
          style={{
            position: 'absolute',
            zIndex: 1,
            visibility: mounted ? 'visible' : 'hidden',
            left: 0, top: 0, width: 0, height: 0,
          }}
        >
          <Image
            src="/inmathwetrust.png"
            alt="In Math We Trust"
            width={600}
            height={600}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Mission text — fades in as image moves left */}
        <div
          ref={missionRef}
          style={{
            position: 'absolute',
            zIndex: 2,
            opacity: 0,
            left: 0, top: 0, width: 0,
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#4a4a4a', lineHeight: 1.85 }}>
            {mission}
          </p>
        </div>
      </div>
    </div>
  )
}
