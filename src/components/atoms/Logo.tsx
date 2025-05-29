import publicPaths from '@/src/lib/images'
import Image from 'next/image'

export interface LogoProps {
  width?: number
  height?: number
  className?: string
}
export default function Logo({ width, height, className }: LogoProps) {
  return (
    <Image
      src={publicPaths.identity.logo}
      width={width ?? 100}
      height={height ?? 100}
      className={className}
      alt='logo'
    />
  )
}
