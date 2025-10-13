'use client'

import { cn } from '@/src/lib/utils/cn'
import React, { memo, ReactElement, useState } from 'react'
import { FaSearch, FaTrash /* FaPlus */ } from 'react-icons/fa'
import Input from '@/src/components/atoms/Input'
import { ModalBody } from '@/src/components/molecules/Modal/components/ModalBody'
import { TableEditForm } from '../../types'
import useOnSearch from '../../hooks/useOnSearch'

export interface TableActionsProps {
  /**
   * Nombre único de la tabla
   */
  id: string

  /**
   * Lista de IDs de las filas seleccionadas
   */
  selectedIds: string[]

  /**
   * Función que se ejecuta cuando se seleccionan filas
   */
  setSelectedIds?: React.Dispatch<React.SetStateAction<string[]>>

  /**
   * Función que se ejecuta cuando se desea eliminar filas
   * @param ids Lista de IDs de las filas a eliminar
   */
  onDelete?: (ids: string[]) => void

  /**
   * Función que se ejecuta cuando se realiza una búsqueda
   * @param value Texto de búsqueda
   */
  onSearch?: (value: string) => void

  /**
   * Formulario para crear una nueva fila
   */
  createForm?: ReactElement<typeof ModalBody>

  /**
   * Formulario para editar una fila
   */
  editForm?: TableEditForm

  /**
   * Función que se ejecuta cuando se actualizan los datos de la tabla
   */
  refetch?: () => void

  /**
   * Modo de carga de la modal
   */
  modalLoadingMode?: 'lazy' | 'eager'
}

/**
 * Componente que muestra las acciones de la tabla (eliminar, editar y crear).
 */
const TableActions = ({
  id,
  setSelectedIds,
  selectedIds,
  onDelete,
  onSearch
}: TableActionsProps) => {
  const { handleSearch } = useOnSearch({ onSearch })
  const [searchText, setSearchText] = useState('')

  return (
    <div className='flex flex-row max-w-full py-4 px-4 items-center gap-4 justify-between'>
      <div className='flex flex-row w-1/3 py-4 items-center justify-start gap-4'>
        <div className='relative w-full h-[48px]'>
          <FaSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 z-10' />
          <Input.TextField
            className='w-full h-full pl-8 focus:pl-4'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              handleSearch(e.target.value)
            }}
            position='none'
            name='search'
            type='text'
            placeholder='Buscar'
          />
        </div>
        {onDelete && (
          <FaTrash
            onClick={
              selectedIds.length > 0
                ? () => {
                    setSelectedIds?.((prev) =>
                      prev.filter((id) => !selectedIds.includes(id))
                    )
                    onDelete?.(selectedIds)
                  }
                : undefined
            }
            className={cn(
              selectedIds.length > 0
                ? 'cursor-pointer text-red-400'
                : 'cursor-not-allowed text-gray-400'
            )}
          />
        )}

      </div>
    </div>
  )
}

export default memo(TableActions)
