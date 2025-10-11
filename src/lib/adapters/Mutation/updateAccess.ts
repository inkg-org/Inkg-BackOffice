'use client'

import { useMutation } from '@tanstack/react-query'
import { updateAuthUser } from '../Query/Accesses'

export interface UpdateAccessFormData {
  id: string
  email?: string
  password?: string
  role?: string
}

export default function useUpdateAccess({ options }: { options?: any } = {}) {
  return useMutation<unknown, Error, UpdateAccessFormData>({
    mutationFn: async (data) => {
      return await updateAuthUser(data.id, data)
    },
    ...options
  })
}
