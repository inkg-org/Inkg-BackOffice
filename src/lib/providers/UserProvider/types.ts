import { User } from '@supabase/supabase-js'
import { Tables } from '../../types/supabase'

export interface IUserState {
  profile: Tables<'profile'> | null
  isLoadingProfile: boolean
  userId: string | undefined
  user: User | undefined | null
}

export interface IUserActions {
  setProfile: (profile: Tables<'profile'> | null) => void
  setIsLoadingProfile: (isLoading: boolean) => void
  setUserId: (value: string | undefined) => void
  setUser: (user: User | undefined | null) => void
}

type IUserProvider = IUserActions & IUserState

export default IUserProvider
