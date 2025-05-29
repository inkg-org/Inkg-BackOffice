'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import LottieBackground from '@/src/components/atoms/Lottie/LottieBackground'
import publicPaths from '@/src/lib/images'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../utils/authService'
import TextField from '@/src/components/atoms/Input/TextField'
import InputGroup from '@/src/components/atoms/Input/InputGroup'

const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1),
  password: z.string().min(1)
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const { mutate: loginMutate, isPending: isLoading } = useMutation({
    mutationFn: async (formData: LoginFormData) => {
      return loginUser(formData)
    },
    onSuccess: () => {
      router.push('/menu')
    }
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data, {
      onError: (error: any) => {
        toast.error(error?.message || 'Invalid login credentials')
      }
    })
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <div className='relative min-h-screen w-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
      <div className='absolute inset-0 -z-0 opacity-20 pt-48'>
        <LottieBackground />
      </div>

      <div className='max-w-md w-full space-y-4 z-30'>
        <div className='flex justify-center'>
          <Image
            src={publicPaths.identity.logo}
            alt='Logo'
            width={150}
            height={150}
          />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-700'>
          Login for citizens
        </h2>

        <p className='mt-2 text-center text-sm text-gray-600'>
          Enter your email and password to access your account.
        </p>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <input type='hidden' name='remember' defaultValue='true' />
          <InputGroup>
            <TextField
              type='email'
              name='email'
              placeholder='Email'
              autoComplete='email'
              control={control}
              rules={{ required: 'El email es obligatorio' }}
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}

            <TextField
              includeObscure
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              control={control}
              rules={{ required: 'La contraseña es obligatoria' }}
            />
            {errors.password && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </InputGroup>

          <div>
            <button
              type='submit'
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading || !isValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <div className='text-center mt-2'>
              <p
                className='underline mt-3 text-center font-black text-sm text-indigo-700 hover:text-indigo-400 cursor-pointer'
                onClick={handleRegister}
              >
                Don&apos;t have an account? Become a Citizen
              </p>
              <p
                className='underline mt-10 text-sm text-indigo-700 hover:text-indigo-400 cursor-pointer'
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
