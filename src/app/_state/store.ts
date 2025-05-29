import { createStore } from 'zustand'

export type GlobalState = {
  isGlobalLoading: boolean
}

export type GlobalActions = {
  setGlobalLoading: (isGlobalLoading: boolean) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const defaultGlobalState: GlobalState = { isGlobalLoading: false }

export const createGlobalStore = (
  initialState: GlobalState = defaultGlobalState
) => {
  return createStore<GlobalStore>()((set) => ({
    ...initialState,
    setGlobalLoading: (isGlobalLoading: boolean) => set({ isGlobalLoading })
  }))
}
