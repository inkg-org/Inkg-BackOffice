import { ReactElement, ReactNode } from 'react'
import { ModalBody } from '../../molecules/Modal/components/ModalBody'

export interface TableEditFormProps {
  id: string
  onSuccess?: () => void
}

export type TableEditForm = (
  props: TableEditFormProps
) => ReactElement<typeof ModalBody>

export interface TableRow {
  id: string
  values: ReactNode[]
}

export type modalLoadingMode = 'lazy' | 'eager'
