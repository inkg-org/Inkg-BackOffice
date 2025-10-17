'use client'

import { useMutation } from '@tanstack/react-query'

export interface deleteUserParams {
  ids: string[]
}

export async function deleteUser({ ids }: deleteUserParams) {
  const res = await fetch('/api/delete-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error deleting user')
  return data
}

export default function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser
  })
}
