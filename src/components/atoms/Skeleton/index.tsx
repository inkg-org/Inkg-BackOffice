import { cn } from '@/src/lib/utils/cn'
import React from 'react'

export interface SkeletonProps {
  className?: string
  standalone?: boolean
}
function Skeleton({ className, standalone = false }: SkeletonProps) {
  return (
    <div
      className={cn(
        'h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4',
        standalone ? 'animate-pulse' : '',
        className
      )}
    ></div>
  )
}

export default Skeleton
