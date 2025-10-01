import { z } from 'zod'

export const updateUserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  secondaryAddress: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.coerce.number({
    invalid_type_error: 'ZIP code must be a number'
  }),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(13, 'Phone number must be at most 13 digits')
    .regex(
      /^\+?\d+$/,
      'Phone number must contain only digits and may start with +'
    ).optional(),
  certificateNumber: z
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
  DOBShort: z.string().optional(),
  birthPlace: z.string().min(1, 'Birth place is required'),
  nacionality: z.string().min(1, 'Nationality is required').optional(),
  gender: z.enum(['Male', 'Female', 'Other']),
  clan: z.enum(['Bear Clan', 'Wolf Clan', 'Turtle Clan']).nullable(),

  height: z.string().min(1, 'Height is required'),
  weight: z.coerce.number({ invalid_type_error: 'Weight must be a number' }),
  eyeColor: z.enum([
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
  hairColor: z.enum([
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

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
