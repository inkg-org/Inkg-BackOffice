import { User } from '@supabase/supabase-js'

export interface AuthContextType {
  user: User | null
  loading: boolean
}

export interface LoginInput {
  email: string
  password: string
}
