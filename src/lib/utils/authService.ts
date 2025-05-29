import { LoginInput } from '../types/auth'
import { supabase } from './supabase'

export async function loginUser({ email, password }: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message)
  return data
}
