'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FadeImageProps {
  src: string
  alt: string
  sizes?: string
  objectPosition?: string
}

export default function FadeImage({ src, alt, sizes, objectPosition }: FadeImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      style={{
        objectFit: 'cover',
        objectPosition: objectPosition ?? 'center',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      onLoad={() => setLoaded(true)}
    />
  )
}
