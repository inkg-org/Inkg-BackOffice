import { createClient } from '@/src/lib/utils/supabase/client'
import { CreateUserSchema } from '../../types/createUser'

const supabase = createClient()

export async function createUser(formData: CreateUserSchema) {
  const { email, password, role, ...profileData } = formData

  const { data: userResponse, error: signUpError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        role
      }
    })

  if (signUpError || !userResponse?.user?.id) {
    throw new Error(signUpError?.message || 'Error creating user')
  }

  const userId = userResponse.user.id

  console.log('Payload to insert:', {
    user_id: userId,
    ...profileData
  })

  const { error: profileError } = await supabase.from('profile').insert([
    {
      user_id: userId,
      ...profileData
    }
  ])

  if (profileError) {
    throw new Error(profileError.message)
  }

  return { message: 'User successfully created', userId }
}
