import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import IUserProvider, { IUserState } from './types'

export const defaultUserState: IUserState = {
  profile: null,
  isLoadingProfile: false,
  userId: undefined,
  user: undefined
}

const useUserProvider = create<IUserProvider>()(
  persist(
    (set) => ({
      ...defaultUserState,
      setProfile: (profile) =>
        set((state) => ({
          ...state,
          profile
        })),
      setIsLoadingProfile: (isLoading) =>
        set((state) => ({
          ...state,
          isLoadingProfile: isLoading
        })),
      setUserId: (value) =>
        set((state) => ({
          ...state,
          userId: value
        })),
      setUser: (user) =>
        set((state) => ({
          ...state,
          user
        }))
    }),
    {
      name: 'user-provider'
    }
  )
)

export default useUserProvider
