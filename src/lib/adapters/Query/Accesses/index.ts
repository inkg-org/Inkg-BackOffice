'use server'

import { supabaseAdmin } from './client'

export async function getAuthUser(id: string) {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(id)
  if (error) throw new Error(error.message)
  return data.user
}

export async function updateAuthUser(
  id: string,
  updates: {
    email?: string
    password?: string
    role?: string
  }
) {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
    email: updates.email,
    password: updates.password,
    user_metadata: { role: updates.role }
  })
  if (error) throw new Error(error.message)
  return data.user
}
