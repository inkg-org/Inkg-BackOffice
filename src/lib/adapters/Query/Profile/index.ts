import { createClient } from '@/src/lib/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export interface getProfileParams {
  userId: string | undefined | null
}
export async function getProfile(params: getProfileParams) {
  const { userId } = params

  if (!userId) return

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export interface useGetProfileProps {
  userId: string | undefined | null
}
export default function useGetProfile({ userId }: useGetProfileProps) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfile({ userId }),
    enabled: !!userId
  })
}
