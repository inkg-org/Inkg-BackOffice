import { cn } from '@/src/lib/utils/cn'
import React from 'react'

export interface OverlayProps {
  id: string
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}
export default function Overlay({
  id,
  children,
  className,
  onClick
}: OverlayProps) {
  return (
    <div
      id={id}
      tabIndex={-1}
      aria-hidden={true}
      onClick={onClick}
      className={cn(
        'fixed top-0 right-0 left-0 z-50',
        'w-full h-full bg-black bg-opacity-50',
        className
      )}
    >
      {children}
    </div>
  )
}
