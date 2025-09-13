'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/src/lib/utils/supabase/client'

// 🔹 Obtiene todos los perfiles
export async function getAllProfiles() {
  const supabase = createClient()
  const { data, error } = await supabase.from('profile').select('*')
  if (error) throw error
  return data
}

// 🔹 Hook para obtener todos los perfiles
export function useGetAllProfiles() {
  return useQuery({
    queryKey: ['allProfiles'],
    queryFn: getAllProfiles
  })
}

// 🔹 Obtiene un perfil por ID
export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// 🔹 Hook para obtener un perfil
export function useGetProfile(userId: string | undefined | null) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => {
      if (!userId) throw new Error('No user ID provided')
      return getProfile(userId)
    },
    enabled: !!userId
  })
}
