import { CreateUserSchema } from '@/src/lib/types/createUser'

export async function createUser(formData: CreateUserSchema) {
  const response = await fetch('/api/create-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Error creating user')
  }

  return data
}
