import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
})

export type LoginSchemaType = z.infer<typeof loginSchema>
