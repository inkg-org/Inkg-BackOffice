'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createMenuStore, MenuStore } from './store'

export type MenuStoreApi = ReturnType<typeof createMenuStore>

export const MenuStoreContext = createContext<MenuStoreApi | undefined>(
  undefined
)

export interface MenuStoreProviderProps {
  children: ReactNode
}
export default function MenuStoreProvider({
  children
}: MenuStoreProviderProps) {
  const storeRef = useRef<MenuStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createMenuStore()
  }

  return (
    <MenuStoreContext.Provider value={storeRef.current}>
      {children}
    </MenuStoreContext.Provider>
  )
}

export function useMenuStore<T>(selector: (store: MenuStore) => T): T {
  const store = useContext(MenuStoreContext)

  if (!store) {
    throw new Error('useMenuStore must be used within a MenuStoreProvider')
  }

  return useStore(store, selector)
}
