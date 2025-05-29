import { createClient } from '@/src/lib/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export interface getCredentialsParams {
  userId: string | undefined | null
}
export async function getCredentials(params: getCredentialsParams) {
  const { userId } = params

  if (!userId) return

  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('profile_id', userId)

  if (error) {
    throw error
  }

  return data
}

export interface useGetCredentialsProps {
  userId: string | undefined | null
}
export default function useGetCredentials({ userId }: useGetCredentialsProps) {
  return useQuery({
    queryKey: ['credentials', userId],
    queryFn: () => getCredentials({ userId }),
    enabled: !!userId
  })
}
