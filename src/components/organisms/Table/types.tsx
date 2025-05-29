import { ReactNode } from 'react'

export interface TableRow {
  id: string
  values: ReactNode[]
}

export type modalLoadingMode = 'lazy' | 'eager'
