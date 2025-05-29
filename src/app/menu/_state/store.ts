import { User } from '@supabase/supabase-js'
import { createStore } from 'zustand'

export type MenuState = {
  user: User | undefined
}

export type MenuActions = {
  setUser: (user: User) => void
}

export type MenuStore = MenuState & MenuActions

export const defaultMenuState: MenuState = { user: undefined }

export const createMenuStore = (initialState: MenuState = defaultMenuState) => {
  return createStore<MenuStore>()((set) => ({
    ...initialState,
    setUser: (user: User) => set({ user })
  }))
}
