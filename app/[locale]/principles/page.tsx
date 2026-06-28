'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

export default function PrinciplesPage() {
  return <PrinciplesContent />
}

function PrinciplesContent() {
  return <PrinciplesV2 />
}

function PrinciplesV2() {
  const locale = useLocale()
  const t = useTranslations('principles.v2')
  const [activeLayer, setActiveLayer] = useState<'internet' | 'bitcoin' | 'ai' | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [revealed, setRevealed] = useState(3)
  const order = ['internet', 'bitcoin', 'ai'] as const
  const isRevealed = (key: 'internet' | 'bitcoin' | 'ai') => order.indexOf(key) < revealed
  const [paths, setPaths] = useState<Record<'internet' | 'bitcoin' | 'ai', string>>({
    internet: '',
    bitcoin: '',
    ai: '',
  })

  const layers = [
    { key: 'internet' as const, old: t('layers.internet.old'), label: t('layers.internet.label') },
    { key: 'bitcoin' as const, old: t('layers.bitcoin.old'), label: t('layers.bitcoin.label') },
    { key: 'ai' as const, old: t('layers.ai.old'), label: t('layers.ai.label') },
  ]

  const active = activeLayer ? {
    title: t(`layers.${activeLayer}.readoutTitle`),
    body: t(`layers.${activeLayer}.readoutBody`),
  } : {
    title: t('readout.title'),
    body: t('readout.body'),
  }

  const comparisons = [
    { key: 'voice' as const },
    { key: 'exit' as const },
    { key: 'allocate' as const },
  ]

  const principles = [
    { key: 'duration' as const },
    { key: 'firstPrinciples' as const },
    { key: 'discipline' as const },
    { key: 'conviction' as const },
  ]

  // One half repeated enough times to overflow the viewport, then doubled
  // for a seamless -50% loop with no gap at the wrap point.
  const tickerKeys = ['internet', 'bitcoin', 'ai', 'exit'] as const
  const tickerHalf = Array.from({ length: 3 }, () => tickerKeys).flat()

  const activateLayer = (layer: 'internet' | 'bitcoin' | 'ai') => {
    setActiveLayer(layer)
  }

  useEffect(() => {
    const updatePaths = () => {
      const stage = stageRef.current
      if (!stage) return

      const stageRect = stage.getBoundingClientRect()
      const core = stage.querySelector<HTMLElement>('[data-core="true"]')
      if (!core) return

      const point = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect()
        return {
          x: rect.left - stageRect.left + rect.width / 2,
          y: rect.top - stageRect.top + rect.height / 2,
        }
      }

      const corePoint = point(core)
      const nextPaths = (['internet', 'bitcoin', 'ai'] as const).reduce((acc, key) => {
        const oldNode = stage.querySelector<HTMLElement>(`[data-old="${key}"]`)
        const newNode = stage.querySelector<HTMLElement>(`[data-new="${key}"]`)
        if (!oldNode || !newNode) return acc

        const start = point(oldNode)
        const end = point(newNode)
        const oldEdge = { x: start.x + oldNode.getBoundingClientRect().width / 2, y: start.y }
        const newEdge = { x: end.x - newNode.getBoundingClientRect().width / 2, y: end.y }
        const c1 = { x: oldEdge.x + (corePoint.x - oldEdge.x) * 0.72, y: oldEdge.y }
        const c2 = { x: corePoint.x - 24, y: corePoint.y }
        const c3 = { x: corePoint.x + 24, y: corePoint.y }
        const c4 = { x: newEdge.x - (newEdge.x - corePoint.x) * 0.72, y: newEdge.y }

        acc[key] = `M ${oldEdge.x} ${oldEdge.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${corePoint.x} ${corePoint.y} C ${c3.x} ${c3.y}, ${c4.x} ${c4.y}, ${newEdge.x} ${newEdge.y}`
        return acc
      }, {} as Record<'internet' | 'bitcoin' | 'ai', string>)

      setPaths(nextPaths)
    }

    updatePaths()
    window.requestAnimationFrame(updatePaths)
    const timeout = window.setTimeout(updatePaths, 300)
    window.addEventListener('resize', updatePaths)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('resize', updatePaths)
    }
  }, [isMobile])

  // Track viewport so the scroll-reveal only runs on mobile.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Mobile: reveal layers one row at a time as the pinned stage scrolls.
  useEffect(() => {
    if (!isMobile) {
      setRevealed(3)
      return
    }
    setRevealed(0)
    const thresholds = [0.08, 0.4, 0.72]
    const onScroll = () => {
      const pin = pinRef.current
      if (!pin) return
      const rect = pin.getBoundingClientRect()
      const scrollable = pin.offsetHeight - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      const count = thresholds.reduce((acc, t) => (p >= t ? acc + 1 : acc), 0)
      setRevealed(count)
      setActiveLayer(count > 0 ? order[count - 1] : null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <>
      <div className="principles-v2-shell principles-v2-hero">
        <div className={`principles-v2-copy${locale === 'zh' ? ' is-zh' : ''}${locale === 'es' ? ' is-es' : ''}`}>
          <div>
            <h1>{t('headline')}</h1>
          </div>
          <p className="principles-v2-lead">{t('lead')}</p>
        </div>

        <div ref={pinRef} className="principles-v2-pin">
        <div
          ref={stageRef}
          className={`principles-v2-stage${activeLayer ? ' is-focused' : ''}${locale === 'zh' ? ' is-zh' : ''}${locale === 'es' ? ' is-es' : ''}`}
          aria-label={t('stageAria')}
        >
          <svg className="principles-v2-paths" aria-hidden="true">
            {layers.map((layer) => (
              <path
                key={layer.key}
                className={`${activeLayer === layer.key ? 'is-active' : ''}${isRevealed(layer.key) ? ' is-revealed' : ''}`}
                d={paths[layer.key]}
              />
            ))}
          </svg>

          {layers.map((layer) => (
            <button
              key={`old-${layer.key}`}
              className={`principles-v2-node old ${layer.key}${activeLayer === layer.key ? ' is-source' : ''}${isRevealed(layer.key) ? ' is-revealed' : ''}`}
              data-old={layer.key}
              type="button"
              onClick={() => activateLayer(layer.key)}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') activateLayer(layer.key)
              }}
              onFocus={() => activateLayer(layer.key)}
            >
              <small>{t('oldSource')}</small>
              <strong>{layer.old}</strong>
            </button>
          ))}

          <div className="principles-v2-core" data-core="true"><span>{t('core')}</span></div>

          {layers.map((layer) => (
            <button
              key={layer.key}
              className={`principles-v2-node new ${layer.key}${activeLayer === layer.key ? ' is-active' : ''}${isRevealed(layer.key) ? ' is-revealed' : ''}`}
              data-new={layer.key}
              type="button"
              onClick={() => activateLayer(layer.key)}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') activateLayer(layer.key)
              }}
              onFocus={() => activateLayer(layer.key)}
            >
              <small>{t('openLayer')}</small>
              <strong>{layer.label}</strong>
            </button>
          ))}

          <p className="principles-v2-readout" aria-live="polite">
            <strong>{active.title}</strong>
            <span>{active.body}</span>
          </p>
        </div>
        </div>
      </div>

      <section className={`principles-v2-ticker${locale === 'zh' ? ' is-zh' : ''}`} aria-hidden="true">
        <div>
          {[...tickerHalf, ...tickerHalf].map((key, i) => (
            <span key={i}>{t(`ticker.${key}`)}</span>
          ))}
        </div>
      </section>

      <section className={`principles-v2-shell principles-v2-section${locale === 'zh' ? ' is-zh' : ''}`}>
        <div className="principles-v2-section-head">
          <h2>{t('belief.heading')}</h2>
        </div>
        <div className="principles-v2-belief">
          <div className="principles-v2-belief-dark">
            <p>{t('belief.darkCopy')}</p>
            <strong>{t('belief.darkTitleLine1')}<br />{t('belief.darkTitleLine2')}<br />{t('belief.darkTitleLine3')}</strong>
          </div>
          <div className="principles-v2-belief-light">
            {comparisons.map(({ key }) => (
              <div className="principles-v2-compare" key={key}>
                <b>{t(`belief.${key}.title`)}</b>
                <p>{t(`belief.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`principles-v2-shell principles-v2-section${locale === 'zh' ? ' is-zh' : ''}`}>
        <div className="principles-v2-section-head">
          <h2>{t('principles.heading')}</h2>
        </div>
        <div className="principles-v2-principles">
          {principles.map(({ key }, index) => (
            <article className="principles-v2-principle" key={key}>
              <em>{String(index + 1).padStart(2, '0')}</em>
              <h3>{t(`principles.${key}.title`)}</h3>
              <p>{t(`principles.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        .principles-v2-shell {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .principles-v2-hero {
          position: relative;
          min-height: calc(100vh - 144px);
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(460px, 1.12fr);
          gap: 54px;
          align-items: center;
          padding: 40px 0 72px;
          isolation: isolate;
        }

        .principles-v2-copy {
          min-height: 680px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 34px;
          padding: 38px 0 44px;
        }

        .principles-v2-hero h1,
        .principles-v2-section h2 {
          margin: 0;
          color: #151515;
          font-family: var(--font-serif);
          font-weight: 400;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .principles-v2-hero h1 {
          margin-top: 20px;
          font-size: clamp(50px, 8vw, 96px);
          line-height: 0.94;
        }

        .principles-v2-copy.is-zh h1 {
          max-width: 620px;
          font-family: var(--font-sans);
          font-size: clamp(42px, 6vw, 68px);
          font-weight: 500;
          line-height: 1.12;
          text-wrap: balance;
        }

        .principles-v2-copy.is-es h1 {
          max-width: 560px;
          font-size: clamp(46px, 6.2vw, 78px);
          line-height: 1.02;
        }

        .principles-v2-copy.is-zh .principles-v2-lead {
          max-width: 560px;
          font-size: 16px;
          line-height: 1.9;
        }

        .principles-v2-lead {
          margin: 0;
          max-width: 520px;
          color: #444444;
          font-family: var(--font-sans);
          font-size: 17px;
          line-height: 1.75;
        }

        .principles-v2-pin {
          display: contents;
        }

        .principles-v2-stage {
          position: relative;
          min-height: 680px;
          overflow: visible;
          background: transparent;
          isolation: isolate;
        }

        .principles-v2-stage.is-es {
          min-height: 740px;
        }

        .principles-v2-stage::before {
          content: "";
          position: absolute;
          width: min(92vw, 980px);
          aspect-ratio: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(circle, transparent 0 22%, rgba(21, 21, 21, 0.13) 22.1% 22.25%, transparent 22.35%),
            radial-gradient(circle, transparent 0 32%, rgba(21, 21, 21, 0.1) 32.1% 32.25%, transparent 32.35%),
            radial-gradient(circle, transparent 0 45%, rgba(21, 21, 21, 0.075) 45.1% 45.25%, transparent 45.35%),
            radial-gradient(circle, transparent 0 59%, rgba(21, 21, 21, 0.055) 59.1% 59.25%, transparent 59.35%),
            radial-gradient(circle, transparent 0 74%, rgba(21, 21, 21, 0.04) 74.1% 74.25%, transparent 74.35%);
          z-index: 0;
          pointer-events: none;
        }

        .principles-v2-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 156px;
          height: 156px;
          transform: translate(-50%, -50%);
          display: grid;
          place-items: center;
          border: 1px solid #151515;
          border-radius: 50%;
          background: #ffffff;
          z-index: 3;
        }

        .principles-v2-core span {
          font-family: var(--font-serif);
          font-size: 42px;
          line-height: 1;
        }

        .principles-v2-core::before,
        .principles-v2-core::after {
          content: "";
          position: absolute;
          inset: -22px;
          border: 1px solid rgba(21, 21, 21, 0.2);
          border-radius: 50%;
          animation: principles-v2-orbit 12s linear infinite;
        }

        .principles-v2-core::after {
          inset: -44px;
          animation-duration: 18s;
          animation-direction: reverse;
        }

        .principles-v2-node {
          position: absolute;
          width: 148px;
          min-height: 82px;
          padding: 15px 16px;
          border: 1px solid #151515;
          background: #ffffff;
          color: #151515;
          text-align: left;
          transition: transform 180ms ease, background 180ms ease, color 180ms ease, opacity 180ms ease, border-color 180ms ease;
          z-index: 2;
        }

        .principles-v2-node small {
          display: block;
          margin-bottom: 5px;
          color: #777777;
          font-size: 12px;
        }

        .principles-v2-node strong {
          display: block;
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 400;
          line-height: 1;
        }

        .principles-v2-stage.is-zh .principles-v2-node strong,
        .principles-v2-stage.is-zh .principles-v2-core span,
        .principles-v2-stage.is-zh .principles-v2-readout strong {
          font-family: var(--font-sans);
          font-weight: 500;
        }

        .principles-v2-stage.is-zh .principles-v2-node strong {
          font-size: 24px;
          line-height: 1.18;
        }

        .principles-v2-stage.is-zh .principles-v2-core span {
          font-size: 34px;
        }

        .principles-v2-stage.is-zh .principles-v2-readout strong {
          font-size: 21px;
          line-height: 1.25;
        }

        .principles-v2-node.old {
          border-color: #e5e5e5;
          color: #444444;
          cursor: pointer;
        }

        .principles-v2-node.new {
          background: #1C4A60;
          color: #ffffff;
          cursor: pointer;
        }

        .principles-v2-node.new small { color: #d7d7d7; }

        .principles-v2-node.new:hover,
        .principles-v2-node.new:focus-visible,
        .principles-v2-node.new.is-active {
          transform: translateY(-7px);
          background: #1C4A60;
          color: #ffffff;
          outline: none;
        }

        .principles-v2-node.old:hover,
        .principles-v2-node.old:focus-visible,
        .principles-v2-node.old.is-source {
          transform: translateX(7px);
          border-color: #151515;
          color: #151515;
          outline: none;
        }

        .principles-v2-node.internet.old { left: 48px; top: 84px; }
        .principles-v2-node.bitcoin.old { left: 48px; top: 268px; }
        .principles-v2-node.ai.old { left: 48px; top: 452px; }
        .principles-v2-node.internet.new { right: 52px; top: 70px; }
        .principles-v2-node.bitcoin.new { right: 52px; top: 268px; }
        .principles-v2-node.ai.new { right: 52px; top: 466px; }

        .principles-v2-paths {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .principles-v2-paths path {
          fill: none;
          stroke: #151515;
          stroke-width: 1;
          stroke-dasharray: 4 12;
          opacity: 0.36;
          animation: principles-v2-flow 3.2s linear infinite;
          transition: opacity 180ms ease, stroke-width 180ms ease;
        }

        .principles-v2-paths path.is-active {
          opacity: 1;
          stroke-width: 2;
        }

        .principles-v2-stage.is-focused .principles-v2-node {
          opacity: 0.26;
        }

        .principles-v2-stage.is-focused .principles-v2-node.is-active,
        .principles-v2-stage.is-focused .principles-v2-node.is-source,
        .principles-v2-stage.is-focused .principles-v2-core {
          opacity: 1;
        }

        .principles-v2-readout {
          position: absolute;
          left: 50%;
          bottom: 28px;
          width: min(560px, calc(100% - 96px));
          transform: translateX(-50%);
          padding: 18px 0 0;
          margin: 0;
          background: transparent;
          border-top: 1px solid rgba(21, 21, 21, 0.35);
          text-align: center;
          z-index: 4;
        }

        .principles-v2-readout strong {
          display: block;
          margin-bottom: 6px;
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 400;
          line-height: 1.05;
        }

        .principles-v2-readout span {
          display: block;
          margin: 0 auto;
          max-width: 520px;
          color: #444444;
          font-size: 14px;
          line-height: 1.55;
        }

        .principles-v2-ticker {
          margin: 4px 0 18px;
          overflow: hidden;
        }

        .principles-v2-ticker div {
          display: flex;
          width: max-content;
          animation: principles-v2-ticker 90s linear infinite;
        }

        .principles-v2-ticker span {
          padding: 18px 0;
          white-space: nowrap;
          color: #444444;
          font-family: var(--font-serif);
          font-size: 24px;
        }

        .principles-v2-ticker span::after {
          content: "·";
          margin: 0 22px;
          color: #bbbbbb;
        }

        .principles-v2-ticker.is-zh span {
          font-family: var(--font-sans);
          font-size: 17px;
        }

        .principles-v2-section {
          padding: 96px 0 72px;
        }

        .principles-v2-section-head {
          margin-bottom: 42px;
        }

        .principles-v2-section h2 {
          max-width: 760px;
          font-size: clamp(34px, 4.8vw, 58px);
          line-height: 1.03;
        }

        .principles-v2-section.is-zh h2 {
          max-width: 720px;
          font-family: var(--font-sans);
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 500;
          line-height: 1.2;
        }

        .principles-v2-section.is-zh .principles-v2-belief-dark strong,
        .principles-v2-section.is-zh .principles-v2-principle h3 {
          font-family: var(--font-sans);
          font-weight: 500;
        }

        .principles-v2-section.is-zh .principles-v2-belief-dark strong {
          font-size: clamp(40px, 6vw, 68px);
          line-height: 1.05;
        }

        .principles-v2-section.is-zh .principles-v2-principle h3 {
          font-size: 28px;
          line-height: 1.2;
        }

        .principles-v2-compare p,
        .principles-v2-principle p {
          margin: 0;
          color: #444444;
          font-size: 15px;
          line-height: 1.65;
        }

        .principles-v2-belief {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          min-height: 430px;
        }

        .principles-v2-belief-dark {
          padding: 38px;
          background: #1C4A60;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .principles-v2-belief-dark p {
          margin: 0;
          color: #d9d9d9;
          font-size: 15px;
          line-height: 1.7;
        }

        .principles-v2-belief-dark strong {
          font-family: var(--font-serif);
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 400;
          line-height: 0.88;
        }

        .principles-v2-belief-light {
          padding: 38px;
          display: grid;
          align-content: center;
          gap: 16px;
        }

        .principles-v2-compare {
          display: grid;
          grid-template-columns: 110px minmax(0, 1fr);
          gap: 24px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(21, 21, 21, 0.14);
        }

        .principles-v2-compare:last-child {
          border-bottom: 0;
        }

        .principles-v2-compare b {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 400;
        }

        .principles-v2-principles {
          display: grid;
          grid-template-columns: 1fr;
          padding-left: min(18vw, 220px);
        }

        .principles-v2-principle {
          padding: 28px 0;
          display: grid;
          grid-template-columns: 76px minmax(240px, 0.7fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .principles-v2-principle + .principles-v2-principle {
          border-top: 1px solid rgba(21, 21, 21, 0.12);
        }

        .principles-v2-principle em {
          color: #777777;
          font-style: normal;
          font-size: 13px;
        }

        .principles-v2-principle h3 {
          margin: 0;
          font-family: var(--font-serif);
          font-size: 34px;
          font-weight: 500;
          line-height: 1.04;
        }

        .principles-v2-principle p {
          max-width: 440px;
        }

        @keyframes principles-v2-flow {
          to { stroke-dashoffset: -64; }
        }

        @keyframes principles-v2-orbit {
          to { transform: rotate(360deg); }
        }

        @keyframes principles-v2-ticker {
          to { transform: translateX(-50%); }
        }

        @media (max-width: 920px) {
          .principles-v2-hero,
          .principles-v2-section-head,
          .principles-v2-belief {
            grid-template-columns: 1fr;
          }

          .principles-v2-stage {
            min-height: 720px;
          }

          .principles-v2-copy {
            min-height: auto;
            padding: 0;
            gap: 34px;
          }

          .principles-v2-principles {
            padding-left: 0;
          }

          .principles-v2-principle {
            grid-template-columns: 72px minmax(0, 1fr);
          }

          .principles-v2-principle p {
            grid-column: 2;
          }
        }

        @media (max-width: 760px) {
          .principles-v2-shell {
            width: min(100% - 28px, 1180px);
          }

          .principles-v2-hero {
            min-height: auto;
            padding-top: 36px;
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .principles-v2-pin {
            display: block;
            position: relative;
            height: 300vh;
          }

          .principles-v2-stage {
            position: sticky;
            top: calc(50vh - 300px);
            min-height: 0;
            height: 600px;
            padding-top: 0;
          }

          .principles-v2-node {
            width: 104px;
            min-height: 60px;
            padding: 11px 12px;
            opacity: 0.3;
            transition: opacity 0.45s ease, background 0.45s ease, color 0.45s ease, border-color 0.45s ease;
          }

          .principles-v2-node.is-active,
          .principles-v2-node.is-source {
            opacity: 1;
          }

          .principles-v2-stage .principles-v2-node.is-active,
          .principles-v2-stage .principles-v2-node.is-source {
            transform: none;
          }

          .principles-v2-paths path {
            opacity: 0.16;
            transition: opacity 0.55s ease;
          }

          .principles-v2-paths path.is-revealed {
            opacity: 0.5;
          }

          .principles-v2-paths path.is-active {
            opacity: 1;
            stroke-width: 2;
          }

          .principles-v2-node small {
            margin-bottom: 3px;
            font-size: 11px;
          }

          .principles-v2-node strong {
            font-size: 22px;
          }

          .principles-v2-stage.is-zh .principles-v2-node strong {
            font-size: 19px;
            line-height: 1.15;
          }

          .principles-v2-node.internet.old { left: 0; top: 30px; }
          .principles-v2-node.bitcoin.old { left: 0; top: 220px; }
          .principles-v2-node.ai.old { left: 0; top: 410px; }
          .principles-v2-node.internet.new { right: 0; top: 30px; }
          .principles-v2-node.bitcoin.new { right: 0; top: 220px; }
          .principles-v2-node.ai.new { right: 0; top: 410px; }

          .principles-v2-stage::before {
            width: min(86vw, 420px);
            top: 250px;
          }

          .principles-v2-core {
            width: 96px;
            height: 96px;
            top: 250px;
          }

          .principles-v2-core span {
            font-size: 26px;
          }

          .principles-v2-readout {
            top: 500px;
            bottom: auto;
            width: calc(100% - 8px);
            padding-top: 14px;
          }

          .principles-v2-readout strong {
            font-size: 20px;
          }

          .principles-v2-section {
            padding: 64px 0;
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .principles-v2-core::before,
          .principles-v2-core::after,
          .principles-v2-paths path,
          .principles-v2-ticker div {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
