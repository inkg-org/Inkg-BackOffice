import { cn } from '@/src/lib/utils/cn'
import React, { ReactNode } from 'react'

export interface TableHeadingProps {
  children: ReactNode
  className?: string
  isFirst?: boolean
  isLast?: boolean
}

/**
 * Componente estilado para las cabeceras de la tabla (es como un <th></th>)
 */
const TableHeading = ({ children, className, isFirst, isLast }: TableHeadingProps) => {
  return (
    <th
      className={cn(
        'p-4 border-b border-MainBlue bg-MainBlue text-white',
        isFirst && 'rounded-tl-lg',
        isLast && 'rounded-tr-lg',
        className
      )}
    >
      <div className='block text-sm antialiased leading-none text-white  font-semibold'>
        {children}
      </div>
    </th>
  )
}

export default TableHeading
