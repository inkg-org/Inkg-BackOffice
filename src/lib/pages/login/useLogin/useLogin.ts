import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { loginUser } from '../../../utils/authService'

export function useLogin() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push('/menu')
    },
    onError: (error: any) => {
      console.error('Login error:', error.message)
    }
  })

  return mutation
}
