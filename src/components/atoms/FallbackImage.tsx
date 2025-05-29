'use client'

import Image from 'next/image'
import { useState } from 'react'

export interface FallbackImageProps {
  src: string
  fallbackSrc: string
  alt: string
  height: number
  width: number
  className?: string
}
export default function FallbackImage({
  src,
  fallbackSrc,
  alt,
  height,
  width,
  className
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      src={hasError ? fallbackSrc : src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}
