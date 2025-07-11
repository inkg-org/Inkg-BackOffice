import { createClient } from '@/src/lib/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export interface getCredentialsParams {
  limit: number
  offset: number
  search?: string
  id?: string
}

export async function getAllCredentials() {
  const { data, error } = await supabase.from('credentials').select('*')
  if (error) throw error
  return data
}

export function useGetAllCredentials() {
  return useQuery({
    queryKey: ['allCredentials'],
    queryFn: getAllCredentials
  })
}

export async function getCredentials(profileId: string) {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('profile_id', profileId)

  if (error) {
    throw error
  }

  return data
}

export interface useGetCredentialsProps {
  limit: number
  offset: number
  search?: string
  customKey?: string
  id?: string
}

export default function useGetCredentials(
  profileId: string | undefined | null
) {
  return useQuery({
    queryKey: ['credentials', profileId],
    queryFn: () => {
      if (!profileId) throw new Error('No profile ID provided')
      return getCredentials(profileId)
    },
    enabled: !!profileId
  })
}
