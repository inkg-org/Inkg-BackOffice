import { cn } from '@/src/lib/utils/cn'
import React, { ReactNode, useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { ModalContext } from './ModalBuilder'

export interface ModalBodyProps {
  children?: ReactNode
  className?: string
  onClose?: () => void
}
export function ModalBody({ children, className, onClose }: ModalBodyProps) {
  const { closeModal } = useContext(ModalContext)
  return (
    <div
      className={cn(
        'relative p-4 w-full max-w-4xl',
        'max-h-full bg-white rounded-lg',
        'shadow',
        'my-8',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex justify-end'>
        <button
          className='text-gray-500 hover:text-gray-800 transition'
          onClick={closeModal}
        >
          <IoClose size={24} />
        </button>
      </div>
      {children}
    </div>
  )
}
