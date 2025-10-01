export interface UpdateProfileApiPayload {
  id: string
  first_name: string
  middle_name?: string
  last_name: string
  address: string
  secondary_address?: string
  city: string
  state: string
  country: string
  zip_code: number
  phone?: string
  certificate_number: string
  birth: string
  DOB_short?: string
  birth_place: string
  nacionality?: string
  gender: 'Male' | 'Female' | 'Other'
  clan: 'Bear Clan' | 'Wolf Clan' | 'Turtle Clan' | null
  height: string
  weight: number
  eye_color:
    | 'BLK'
    | 'BLU'
    | 'BRO'
    | 'GRY'
    | 'GRN'
    | 'HAZ'
    | 'MAR'
    | 'PNK'
    | 'DIC'
    | 'UNK'
  hair_color:
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
  sign?: string
  fingerprints?: string
  photo?: string
  email: string
  role: string
  password: string
}
