'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createGlobalStore, GlobalStore } from './store'

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined
)

export interface GlobalStoreProviderProps {
  children: ReactNode
}
export default function GlobalStoreProvider({
  children
}: GlobalStoreProviderProps) {
  const storeRef = useRef<GlobalStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createGlobalStore()
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

export function useGlobalStore<T>(selector: (store: GlobalStore) => T): T {
  const store = useContext(GlobalStoreContext)

  if (!store) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider')
  }

  return useStore(store, selector)
}
