'use client'

import IMutationOptions from '@/src/lib/types/mutationsOPtions'
import { createClient } from '@/src/lib/utils/supabase/client'
import { useMutation } from '@tanstack/react-query'

const supabase = createClient()

export interface UpdateProfileFormData {
  email?: string
  password?:string
  role?: string
  id: string
  firstName: string
  middleName?: string
  lastName: string
  address: string
  secondaryAddress?: string
  city: string
  state: string
  country: string
  zipCode: number
  phone?: string
  certificateNumber: string
  birth: string
  DOBShort?: string
  birthPlace: string
  nacionality?: string
  gender: 'Male' | 'Female' | 'Other'
  clan: 'Bear Clan' | 'Wolf Clan' | 'Turtle Clan' | null
  height: string
  weight: number
  eyeColor:
    | 'BLK'
    | 'BLU'
    | 'BRO'
    | 'GRY'
    | 'GRN'
    | 'HAZ'
    | 'MAR'
    | 'PNK'
    | 'DIC'
    | 'UNK',
  hairColor:
    | 'BLK'
    | 'BLU'
    | 'BRO'
    | 'GRY'
    | 'GRN'
    | 'UNK'
    | 'BAL'
    | 'BLN'
    | 'RED'
    | 'SDY'
    | 'WHI'
    | null,
  sign?: string
  fingerprints?: string
  photo?: string
}

export async function updateProfile({
  id,
  firstName,
  middleName,
  lastName,
  address,
  secondaryAddress,
  city,
  state,
  country,
  zipCode,
  phone,
  certificateNumber,
  birth,
  DOBShort,
  birthPlace,
  nacionality,
  gender,
  clan,
  height,
  weight,
  eyeColor,
  hairColor,
  sign,
  fingerprints,
  photo
}: UpdateProfileFormData) {
  const { data, error } = await supabase
    .from('profile')
    .update({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      address,
      secondary_address: secondaryAddress,
      city,
      state,
      country,
      zip_code: zipCode,
      phone,
      certificate_number: certificateNumber,
      birth,
      DOB_short: DOBShort,
      birth_place: birthPlace,
      nacionality,
      gender,
      clan,
      height,
      weight,
      eye_color: eyeColor,
      hair_color: hairColor,
      sign,
      fingerprints,
      photo
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

export interface useUpdateProfileProps {
  options?: IMutationOptions
}
export default function useUpdateProfile({ options }: useUpdateProfileProps) {
  return useMutation({
    ...options,
    mutationFn: updateProfile
  })
}
