'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ModalBody } from './components/ModalBody'
import EagerModal from './components/EagerModal'
import LazyModal from './components/LazyModal'

export interface ModalProps {
  id: string
  body: React.ReactElement<typeof ModalBody>
  trigger?: React.ReactNode
  isActive?: boolean
  onChange?: (value: boolean) => void
  className?: string
  modalLoadingMode?: 'lazy' | 'eager'
}
export function Modal({
  id,
  trigger,
  body,
  isActive,
  onChange,
  className,
  modalLoadingMode = 'eager'
}: ModalProps) {
  const [active, setActive] = useState(isActive ?? false)

  useEffect(() => {
    if (isActive === undefined) return
    setActive(isActive)
  }, [isActive])

  const openModal = useCallback(() => {
    setActive(true)
    onChange?.(true)
  }, [onChange])

  const closeModal = useCallback(() => {
    setActive(false)
    onChange?.(false)
  }, [onChange])

  return (
    <div>
      {trigger && <span onClick={openModal}>{trigger}</span>}
      {active && (
        <>
          {modalLoadingMode === 'eager' && (
            <EagerModal
              id={id}
              body={body}
              isActive={active}
              closeModal={closeModal}
              className={className}
            />
          )}
          {modalLoadingMode === 'lazy' && (
            <LazyModal
              id={id}
              body={body}
              isActive={active}
              closeModal={closeModal}
              className={className}
            />
          )}
        </>
      )}
    </div>
  )
}
