import { createClient } from '@/src/lib/utils/supabase/client'
import { LoginInput } from '../types/auth'

export async function loginUser({ email, password }: LoginInput) {
  const supabase = createClient()

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
