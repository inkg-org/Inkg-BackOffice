'use client'

import { ReactNode } from 'react'
import Copyright from '../components/atoms/Copyright'
import LoadingScaffold from '../components/molecules/LoadingScaffold'
import GlobalStoreProvider, { useGlobalStore } from './_state/provider'

export interface GlobalProviderProps {
  children: ReactNode
}
export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <GlobalStoreProvider>
      <Body>{children}</Body>
      <Copyright />
      <script src='https://accounts.google.com/gsi/client' async defer></script>
    </GlobalStoreProvider>
  )
}

interface BodyProps {
  children: ReactNode
}
function Body({ children }: BodyProps) {
  const { isGlobalLoading } = useGlobalStore((state) => state)

  return <>{isGlobalLoading ? <LoadingScaffold /> : <>{children}</>}</>
}
