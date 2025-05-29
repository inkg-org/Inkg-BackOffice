'use client'

import { useMemo, useState } from 'react'
import TableHeading from '../../components/TableHeading'
import Skeleton from '@/src/components/atoms/Skeleton'
import TableData from '../../components/TableData'
import TableNoContent from '../../components/TableNoContent'
import { TableRow } from '../../types'

export interface useTableRendersProps {
  /**
   * Lista de los nombres de las columnas.
   */
  cols: string[]

  /**
   * Lista de objetos con las filas de la tabla
   */
  rows: TableRow[] | undefined

  /**
   * Nombre único de la tabla
   */
  id: string

  /**
   * Incluye los componentes de acciones de la tabla (eliminar, editar y crear)
   */
  includeActions: boolean
}

/**
 * Hook que obtiene los JSX de las columnas y filas de la tabla.
 * Se encarga de manejar el estado y la parte lógica del componente
 */
const useTableRenders = ({
  cols,
  rows,
  id,
  includeActions
}: useTableRendersProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const colsRender = useMemo(() => {
    return (
      <tr>
        {cols.map((col, index) => (
            <TableHeading
            key={index}
            isFirst={index === 0}
            isLast={index === cols.length - 1}
          >
            {col}
          </TableHeading>
        ))}
      </tr>
    )
  }, [cols])

  const rowsRender = useMemo(() => {
    if (rows === undefined) {
      return (
        <tr>
          {cols.map((col, i) => (
            <TableData key={col}>
              <Skeleton standalone={true} />
            </TableData>
          ))}
        </tr>
      )
    }

    if (rows.length <= 0) {
      return <TableNoContent />
    }

    return rows.map((row) => {
      return (
        <tr key={row.id}>
          {row.values.map((cell, i) => (
            <TableData key={i}>{cell}</TableData>
          ))}
        </tr>
      )
    })
  }, [cols, rows])

  return { colsRender, rowsRender, selectedIds, setSelectedIds }
}

export default useTableRenders
