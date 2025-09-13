'use client'
import { cn } from '@/src/lib/utils/cn'
import React, { useEffect, useRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { FaChevronDown, FaSpinner } from 'react-icons/fa'

export type SelectFieldSchema = Record<string, any>

export interface Option {
  label: string
  value: string
}

export interface SelectFieldProps<Schema extends SelectFieldSchema = {}> {
  name: keyof Schema
  control: Control<any>
  label?: string
  options: Option[] | undefined
  placeholder?: string
  position?: 'top' | 'bottom' | 'middle'
  isLoading?: boolean
  className?: string
}
const Select = <Schema extends SelectFieldSchema = {}>({
  name,
  control,
  label,
  options,
  placeholder = 'Select an option',
  position = 'middle',
  isLoading = false,
  className
}: SelectFieldProps<Schema>) => {
  const {
    field,
    fieldState: { error }
  } = useController({ name: name as string, control })

  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  // Cierra el select si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={className}>
      {label && <label className={cn(label ? '' : 'sr-only')}>{label}</label>}
      <div className='relative'>
        <select
          {...field}
          className={cn(
            'block w-full px-3 py-2 pr-8 my-2 border appearance-none',
            'focus:outline-none text-sm',
            'placeholder-gray-500',
            error ? 'border-red-500' : 'border-gray-300',
            error
              ? 'focus:ring-red-500'
              : 'focus:ring-primary-500 focus:border-primary-500 rounded-md'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {placeholder && <option value=''>{placeholder}</option>}
          {!isLoading &&
            options &&
            options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className='text-gray-500 text-sm'
              >
                {option.label}
              </option>
            ))}
        </select>
        <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none '>
          {isLoading ? (
            <FaSpinner className='text-gray-400 animate-spin' />
          ) : (
            <FaChevronDown className='text-gray-400' />
          )}
        </div>
      </div>
      {error && <p className='mt-2 text-sm text-red-600'>{error.message}</p>}
    </div>
  )
}

export default Select
