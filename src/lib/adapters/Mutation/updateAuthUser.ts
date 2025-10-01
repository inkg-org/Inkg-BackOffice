export async function updateUserAuth(userId: string, email?: string, password?: string) {
  const response = await fetch('/api/update-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, email, password })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Error updating user')
  }

  return data
}
