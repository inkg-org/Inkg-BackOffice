'use client'

import { useState, FormEvent } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LottieBackground from '@/src/components/atoms/Lottie/LottieBackground'
import publicPaths from '@/src/lib/images'

interface ForgotPasswordProps {
  message?: string
  error?: string
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post<ForgotPasswordProps>(
        '/api/v1/forgotpassword',
        {
          email
        }
      )

      setIsSubmitted(true)
      setMessage('Check your email for the password reset instructions.')

      setTimeout(() => {
        router.push('/login')
      }, 8000)

      if (response.data.message) {
        setMessage('Check your email for the password reset instructions.')
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || 'An unexpected error occurred'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 -z-0 opacity-20 pt-48'>
        <LottieBackground />
      </div>
      <button
        type='button'
        className='font-black absolute top-3 left-3 text-sm text-indigo-600 hover:text-indigo-500'
        onClick={handleBack}
      >
        ← Back
      </button>
      <div className='max-w-md w-full space-y-4'>
        <div className='flex justify-center'>
          <Image
            src={publicPaths.identity.logo}
            alt='Logo'
            width={150}
            height={150}
          />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          {isSubmitted ? 'Check your email' : 'Forgot Password'}
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          {isSubmitted
            ? 'Check your email for password reset instructions.'
            : 'Enter your email below and we will send you a link to reset your password.'}
        </p>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {!isSubmitted && (
            <div className='rounded-md shadow-sm'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className={`mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-50' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Reset your password'}
              </button>
            </div>
          )}
          {isSubmitted && (
            <button
              type='button'
              onClick={handleLogin}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Login back
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
