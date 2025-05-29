import { cn } from '@/src/lib/utils/cn'
import React, { ReactNode } from 'react'

export interface _TableDataProps {
  children: ReactNode
  className?: string
}

/**
 * Componente estilado para las celdas de la tabla (es como un <td></td>)
 */
const TableData = ({ children, className }: _TableDataProps) => {
  return (
    <td className={cn('p-4 border-b border-blue-gray-50', className)}>
      <div className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
        {children}
      </div>
    </td>
  )
}

export default TableData
