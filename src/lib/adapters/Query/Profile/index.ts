'use client'

import { createClient } from '@/src/lib/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export interface GetProfilesParams {
  limit: number
  offset: number
  search?: string
  id?: string
}

// 🚀 Función principal (idéntica estructura a getDrivers)
export async function getAllProfiles({
  limit,
  offset,
  search,
  id
}: GetProfilesParams) {
  // Si tienes un RPC en supabase, puedes reemplazar esto por:
  // const { data, error } = await supabase.rpc('search_profiles', { search_value: search ?? '', limit_value: limit, offset_value: offset })
  // Pero aquí lo hacemos directamente con query.

  let query = supabase
    .from('profile')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1)

  // 🔍 Si hay búsqueda, filtramos
  if (search && search.trim() !== '') {
    query = query.or(
      `first_name.ilike.%${search}%,middle_name.ilike.%${search}%,last_name.ilike.%${search}%,certificate_number.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`
    )
  }

  // 🔎 Si se envía un id, filtramos por él también
  if (id) {
    query = query.eq('id', id)
  }

  const { data, error, count } = await query

  if (error) throw error

  return {
    profiles: data,
    count
  }
}

export interface UseGetAllProfilesProps {
  limit: number
  offset: number
  search?: string
  customKey?: string
  id?: string
}

// 🪄 Hook react-query (idéntico a useGetDrivers)
export function useGetAllProfiles({
  limit,
  offset,
  search,
  customKey = '',
  id
}: UseGetAllProfilesProps) {
  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: ['profiles', limit, offset, search, id, customKey],
    queryFn: () => getAllProfiles({ limit, offset, search, id })
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
