/* eslint-disable camelcase */
'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/src/lib/utils/supabase/client'

export interface GetProfilesParams {
  limit_value: number
  offset_value: number
}

export async function getAllProfiles({
  limit_value,
  offset_value
}: GetProfilesParams) {
  const supabase = createClient()
  const { data, error, count } = await supabase
    .from('profile')
    .select('*', { count: 'exact' }) // cuenta total de filas
    .range(offset_value, offset_value + limit_value - 1) // paginación
  if (error) throw error

  return {
    profiles: data,
    count
  }
}

export function useGetAllProfiles({
  limit_value,
  offset_value
}: GetProfilesParams) {
  return useQuery({
    queryKey: ['allProfiles', limit_value, offset_value],
    queryFn: () => getAllProfiles({ limit_value, offset_value })
    // keepPreviousData: true
  })
}

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
