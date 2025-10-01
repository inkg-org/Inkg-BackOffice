'use client'

import React, { useEffect, useMemo } from 'react'

export interface TablePaginationProps {
  /**
   * Contador de registros totales
   */
  count?: number

  /**
   * Función a ejecutar cuando se cambia la página
   */
  onPaginate?(offset: number, limit: number): void

  /**
   * Carga de la tabla
   */
  isLoading?: boolean

  /**
   * Contador de registros en la página actual
   */
  pageCount?: number

  currentPage?: number
}

/**
 * Componente para paginar una tabla
 */
const TablePagination = ({
  count,
  onPaginate,
  isLoading,
  pageCount,
  currentPage = 0
}: TablePaginationProps) => {
  const itemsPerPage = 10
  const arrayLength = useMemo(() => {
    return Math.ceil((count ?? 0) / itemsPerPage)
  }, [count])

  useEffect(() => {
    if (!isLoading && pageCount === 0) {
      onPaginate?.(0, itemsPerPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <div className='flex flex-row gap-2 items-center py-8 pr-4'>
      Total: {count}
      {arrayLength > 0 &&
        Array.from({ length: arrayLength }, (_, i) => i).map((i) => {
          const isActive = i === currentPage
          return (
            <button
              key={i}
              onClick={() => {
                const offset = itemsPerPage * i
                onPaginate?.(offset, itemsPerPage)
              }}
              className={`px-3 py-1 rounded-md border transition-all duration-300
                ${
                  isActive
                    ? 'bg-MainBlue text-white border-MainBlue'
                    : 'bg-white text-gray-500 hover:text-MainBlue hover:border-MainBlue'
                }`}
            >
              {i + 1}
            </button>
          )
        })}
    </div>
  )
}

export default TablePagination
