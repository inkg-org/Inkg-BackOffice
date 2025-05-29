'use client'

import { createClient } from '@/src/lib/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyEmail() {
  const router = useRouter()
  const params = useParams()
  const { token, type, email } = params
  const [message, setMessage] = useState('Verifying your email...')
  const supabase = createClient()

  useEffect(() => {
    const verifyEmail = async () => {
      if (
        !token ||
        !email ||
        typeof token !== 'string' ||
        typeof email !== 'string'
      ) {
        setMessage('Invalid verification attempt.')
        return
      }

      const { error } = await supabase.auth.verifyOtp({
        token,
        type: type === 'signup' ? 'signup' : 'recovery',
        email
      })

      if (error) {
        console.error('Error verifying email:', error)
        setMessage(
          'Failed to verify email. Please try again or contact support.'
        )
      } else {
        setMessage(
          'Your email has been successfully verified. You may now login.'
        )
      }
    }

    verifyEmail()
  }, [router, token, type, email, supabase.auth])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Verificación de correo electrónico
        </h2>
        <div className='mt-8 space-y-6'>
          <p className='text-center text-sm text-gray-600'>{message}</p>
          <div>
            <button
              onClick={() => router.push('/login')}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Ir a Inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
