'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FadeImageProps {
  src: string
  alt: string
  sizes?: string
}

export default function FadeImage({ src, alt, sizes }: FadeImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      style={{
        objectFit: 'cover',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      onLoad={() => setLoaded(true)}
    />
  )
}
