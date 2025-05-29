'use client'

import React from 'react'
import { modalLoadingMode, TableRow } from './types'
import useTableRenders from './hooks/useTableRenders'
import TableLoadingOverlay from './components/TableLoadingOverlay'

export interface TableProps {
  includeActions?: boolean
  id: string
  cols: string[]
  rows: TableRow[] | undefined
  isActionLoading?: boolean
  refetch?: () => void
  onDelete?(ids: string[]): void
  onSearch?(value: string): void
  count?: number
  onPaginate?(from: number, to: number): void
  modalLoadingMode?: modalLoadingMode
}
function Table({
  id,
  cols,
  rows,
  onDelete,
  includeActions = false,
  isActionLoading,
  onSearch,
  count,
  onPaginate,
  refetch,
  modalLoadingMode = 'eager'
}: TableProps) {
  const { colsRender, rowsRender } =
    useTableRenders({
      id,
      cols,
      rows,
      includeActions
    })

  return (
    <div className='flex flex-col items-end'>
      <div className='text-gray-700 bg-white shadow-md rounded-xl bg-clip-border w-full'>
        <TableLoadingOverlay isActionLoading={isActionLoading} />
        <div className='flex flex-col'>
          <table className='max-w-full text-left table-auto' id={id}>
            <thead>{colsRender}</thead>
            <tbody>{rowsRender}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
