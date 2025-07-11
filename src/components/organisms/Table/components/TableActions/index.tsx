'use client'

import { cn } from '@/src/lib/utils/cn'
import React, { memo, ReactElement, useState } from 'react'
import { FaSearch, FaTrash /* FaPlus */ } from 'react-icons/fa'
import { Modal } from '@/src/components/molecules/Modal'
import Input from '@/src/components/atoms/Input'
import { ModalBody } from '@/src/components/molecules/Modal/components/ModalBody'
import { FaPencil } from 'react-icons/fa6'
import { TableEditForm } from '../../types'
import useOnSearch from '../../hooks/useOnSearch'
import FilledButton from '@/src/components/atoms/Button/FilledButton'

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
  onSearch,
  createForm,
  editForm,
  refetch
}: TableActionsProps) => {
  const { handleSearch } = useOnSearch({ onSearch })
  const [isCreateFormActive, setIsCreateFormActive] = useState(false)
  const [isEditFormActive, setIsEditFormActive] = useState(false)
  const [searchText, setSearchText] = useState('')

  return (
    <div className='flex flex-row max-w-full py-4 px-4 items-center gap-4 justify-between'>
      <div className='flex flex-row w-1/2 py-4 items-center justify-start gap-4'>
        <div className='relative w-[350px] h-[48px]'>
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
        {editForm && (
          <FaPencil
            className={cn(
              selectedIds.length === 1
                ? 'cursor-pointer text-secondary-200'
                : 'cursor-not-allowed text-gray-400'
            )}
            onClick={
              selectedIds.length === 1
                ? () => setIsEditFormActive(true)
                : undefined
            }
          />
        )}
        {createForm && (
          <Modal
            id={id + 'create-form-modal'}
            isActive={isCreateFormActive}
            onChange={setIsCreateFormActive}
            body={createForm}
          />
        )}
        {editForm && selectedIds.length === 1 && (
          <Modal
            id={id + 'edit-form-modal'}
            isActive={isEditFormActive}
            onChange={setIsEditFormActive}
            body={editForm({
              id: selectedIds[0],
              onSuccess: () => {
                refetch?.()
                setIsEditFormActive(false)
                setSelectedIds?.([])
              }
            })}
          />
        )}
      </div>
      <div>
        {createForm && (
          <FilledButton
            onClick={() => setIsCreateFormActive(true)}
            className='w-full mr-8 px-10 font-bold text-md'
          >
            {' '}
            Crear{' '}
          </FilledButton>
        )}
      </div>
    </div>
  )
}

export default memo(TableActions)
