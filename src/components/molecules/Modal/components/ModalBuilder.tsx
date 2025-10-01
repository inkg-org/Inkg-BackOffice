'use client'

import { cn } from '@/src/lib/utils/cn'
import React, { createContext, ReactElement } from 'react'
import { ModalBody } from './ModalBody'
import Overlay from '@/src/components/atoms/Overlay'

interface modalContexProps {
  closeModal: () => void
}

export const ModalContext = createContext<modalContexProps>(null as any)

export interface ModalBuilderProps {
  id: string
  isActive: boolean
  closeModal: () => void
  body: ReactElement<typeof ModalBody>
  className?: string
}
export default function ModalBuilder({
  id,
  isActive,
  closeModal,
  body,
  className
}: ModalBuilderProps) {
  return (
    <ModalContext.Provider
      value={{
        closeModal
      }}
    >
      <Overlay
        id={id + '-overlay'}
        onClick={closeModal}
        className={cn(
          'flex justify-center items-center',
          !isActive && 'hidden',
          className
        )}
      >
        {body}
      </Overlay>
    </ModalContext.Provider>
  )
}
