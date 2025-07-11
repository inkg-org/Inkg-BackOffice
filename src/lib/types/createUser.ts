import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),

  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  certificate_number: z.string().min(1, 'Certificate number is required'),
  phone: z.string().min(1, 'Phone is required'),
  birth: z.coerce.date({ invalid_type_error: 'Birth must be a valid date' }),
  gender: z.enum(['Male', 'Female', 'Other']),
  middle_name: z.string().min(1, 'Middle name is required'),
  nacionality: z.string().min(1, 'Nationality is required'),
  birth_place: z.string().min(1, 'Birth place is required'),

  clan: z.enum(['Wolf Clan', 'Turtle Clan', 'Bear Clan']),
  zip_code: z.string().min(1, 'ZIP code is required'),
  height: z.string().min(1, 'Height is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  weight: z.coerce.number({ invalid_type_error: 'Weight must be a number' }),

  eye_color: z.string().min(1, 'Eye color is required'),
  hair_color: z.string().min(1, 'Hair color is required'),

  sign: z.string().optional(),
  photo: z.string().url().optional(),
  clan_image: z.string().url().optional(),
  secondary_address: z.string().optional(),
  DOB_short: z.string().optional(),
  fingerprints: z.string().url().optional()
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
