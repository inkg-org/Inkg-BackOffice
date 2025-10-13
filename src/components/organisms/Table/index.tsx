'use client'

import React from 'react'
import { modalLoadingMode, TableRow } from './types'
import useTableRenders from './hooks/useTableRenders'
import TableLoadingOverlay from './components/TableLoadingOverlay'
import TablePagination from './components/TablePagination'
import TableActions from './components/TableActions'

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
  currentPage?: number
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
  currentPage,
  modalLoadingMode = 'eager'
}: TableProps) {
  const { colsRender, rowsRender, selectedIds, setSelectedIds } = useTableRenders({
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
          <TableActions
            id={id + '-actions-bar'}
            onDelete={onDelete}
            selectedIds={selectedIds}
            onSearch={onSearch}
            setSelectedIds={setSelectedIds}
            refetch={refetch}
          />
          <table className='max-w-full text-left table-auto' id={id}>
            <thead>{colsRender}</thead>
            <tbody>{rowsRender}</tbody>
          </table>
        </div>
      </div>
      <TablePagination
        count={count}
        currentPage={currentPage}
        onPaginate={onPaginate}
        isLoading={isActionLoading}
        pageCount={rows?.length ?? 1}
      />
    </div>
  )
}

export default Table
