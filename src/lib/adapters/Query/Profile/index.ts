import { createClient } from '@/src/lib/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export async function getAllProfiles() {
  const { data, error } = await supabase.from('profile').select('*')
  if (error) throw error
  return data
}

export function useGetAllProfiles() {
  return useQuery({
    queryKey: ['allProfiles'],
    queryFn: getAllProfiles
  })
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

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
