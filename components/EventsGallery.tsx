'use client'

import Image from 'next/image'

const photos = [
  '/events/top1.png',
  '/events/Bottom1.png',
  '/events/top2.png',
  '/events/Bottom2.png',
  '/events/top3.png',
  '/events/Bottom3.png',
  '/events/top4.png',
  '/events/Bottom4.png',
  '/events/top5.png',
  '/events/Bottom5.png',
  '/events/top6.png',
  '/events/Bottom6.png',
  '/events/top7.png',
  '/events/Bottom7.png',
  '/events/top8.png',
  '/events/Bottom8.png',
]

// Duplicate for seamless loop
const track = [...photos, ...photos]

export default function EventsGallery() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <style>{`
        @keyframes gallery-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-track {
          display: flex;
          gap: 10px;
          width: max-content;
          animation: gallery-scroll 80s linear infinite;
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
        .gallery-item {
          flex-shrink: 0;
          width: 140px;
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
        }
        .gallery-item img {
          width: 140px !important;
          height: 100px !important;
        }
        @media (min-width: 640px) {
          .gallery-item {
            width: 220px;
            height: 160px;
            border-radius: 16px;
          }
          .gallery-item img {
            width: 220px !important;
            height: 160px !important;
          }
        }
      `}</style>
      <div className="gallery-track">
        {track.map((src, i) => (
          <div key={i} className="gallery-item">
            <Image
              src={src}
              alt=""
              width={220}
              height={160}
              style={{
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
