import { LoginInput } from '../types/auth'
import { supabase } from './supabase'

export async function loginUser({ email, password }: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message)

  const user = data.user
  const role = user?.app_metadata?.role

  if (role !== 'admin') {
    throw new Error('You do not have permissions to access the backoffice.')
  }

  return data
}
