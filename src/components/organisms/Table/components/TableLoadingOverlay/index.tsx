'use client'

import LottieLoader from '@/src/components/atoms/Lottie/LottieLoader'
import { cn } from '@/src/lib/utils/cn'
import React from 'react'

export interface TableLoadingOverlayProps {
  isActionLoading?: boolean
}

/**
 * Componente que muestra un overlay mientras se está cargando la tabla.
 */
const TableLoadingOverlay = ({ isActionLoading }: TableLoadingOverlayProps) => {
  return (
    isActionLoading && (
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-gray-400',
          'bg-opacity-50 flex justify-center items-center',
          'z-40'
        )}
      >
        <div className='flex justify-center items-center'>
          <LottieLoader />
        </div>
      </div>
    )
  )
}

export default TableLoadingOverlay
