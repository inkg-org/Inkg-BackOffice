import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Choose a Role'),
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  secondary_address: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zip_code: z.coerce.number({
    invalid_type_error: 'ZIP code must be a number'
  }),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(13, 'Phone number must be at most 13 digits')
    .regex(
      /^\+?\d+$/,
      'Phone number must contain only digits and may start with +'
    ),
  certificate_number: z
    .string()
    .regex(/^INKMIA/, 'Certificate number format is invalid'),
  birth: z
    .string()
    .min(1, 'Birth is required')
    .refine(
      (val) => {
        const date = new Date(val)
        return !isNaN(date.getTime()) && date < new Date()
      },
      { message: 'Birthdate must be earlier than today' }
    ),
  DOB_short: z.string().optional(),
  birth_place: z.string().min(1, 'Birth place is required'),
  nacionality: z.string().min(1, 'Nationality is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  clan: z.enum(['Wolf Clan', 'Turtle Clan', 'Bear Clan']),
  height: z.string().min(1, 'Height is required'),
  weight: z.coerce.number({ invalid_type_error: 'Weight must be a number' }),
  eye_color: z.enum([
    'BLK',
    'BLU',
    'BRO',
    'GRY',
    'GRN',
    'HAZ',
    'MAR',
    'PNK',
    'DIC',
    'UNK'
  ]),
  hair_color: z.enum([
    'BLK',
    'BLU',
    'BRO',
    'GRY',
    'GRN',
    'UNK',
    'BAL',
    'BLN',
    'RED',
    'SDY',
    'WHI'
  ]),
  sign: z.string().optional(),
  fingerprints: z.string().optional(),
  photo: z.string().optional()
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
