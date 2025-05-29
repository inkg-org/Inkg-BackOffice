import { cn } from '@/src/lib/utils/cn'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Control, useController } from 'react-hook-form'
import { FaChevronDown, FaSpinner, FaTimes } from 'react-icons/fa'

export type SelectSearchFieldSchema = Record<string, any>

export interface Option<T = any> {
  label: string
  value: T
}

export interface SelectSearchFieldProps<
  Schema extends SelectSearchFieldSchema = any
> {
  name: keyof Schema
  control: Control<any>
  label?: string
  placeholder?: string
  position?: 'top' | 'bottom' | 'middle'
  isLoading?: boolean
  className?: string
  search: string // Estado externo para la búsqueda
  onSearchChange: (value: string) => void // Función para actualizar el estado de búsqueda
  options: Option[] // Lista de opciones
}

const SelectSearch = <Schema extends SelectSearchFieldSchema = any>({
  name,
  control,
  label,
  placeholder = 'Select an option',
  isLoading = false,
  className,
  search,
  onSearchChange,
  options
}: SelectSearchFieldProps<Schema>) => {
  const {
    field,
    fieldState: { error }
  } = useController({ name: name as string, control })

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  // Maneja el cambio del término de búsqueda
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value)
    },
    [onSearchChange]
  )

  // Maneja la selección de una opción
  const handleOptionSelect = useCallback(
    (option: Option) => {
      field.onChange(option.value)
      setSelectedOption(option)
      setDropdownOpen(false)
    },
    [field]
  )

  const handleClear = useCallback(() => {
    field.onChange('')
    setSelectedOption(null)
    setDropdownOpen(false)
    onSearchChange('')
  }, [field, onSearchChange])

  useEffect(() => {
    if (field.value && field.value !== '') {
      const option = options.find((option) => option.value === field.value)
      if (option) {
        setSelectedOption(option)
      }
    }
  }, [field.value, options])

  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={selectRef} className={className}>
      {label && (
        <label className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          type='text'
          value={selectedOption ? selectedOption.label : search}
          onChange={selectedOption ? undefined : handleSearchChange}
          onFocus={() => setDropdownOpen(true)}
          placeholder={placeholder}
          className={cn(
            'block w-full px-3 py-2 pr-8 my-2 border appearance-none',
            'focus:outline-none text-sm',
            error ? 'border-red-500' : 'border-gray-300',
            error
              ? 'focus:ring-red-500'
              : 'focus:ring-primary-500 focus:border-primary-500 rounded-md'
          )}
        />
        {selectedOption && (
          <div className='absolute inset-y-0 right-0 flex items-center px-2'>
            <FaTimes
              className='text-red-400 cursor-pointer'
              onClick={handleClear}
            />
          </div>
        )}

        <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
          {!selectedOption && (
            <>
              {isLoading ? (
                <FaSpinner className='text-gray-400 animate-spin' />
              ) : (
                <FaChevronDown className='text-gray-400' />
              )}
            </>
          )}
        </div>
        {isDropdownOpen && options.length > 0 && (
          <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg'>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  handleOptionSelect(option)
                }}
                className='px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700'
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className='mt-2 text-sm text-red-600'>{error.message}</p>}
    </div>
  )
}

export default SelectSearch
