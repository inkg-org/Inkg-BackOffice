'use client'

import { useState, useEffect, FormEvent } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/utils/supabase/client'

export default function NewPasswordPage() {
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [, setToken] = useState<string>('')
  const [, setHasError] = useState(false)
  const [isLinkExpired, setIsLinkExpired] = useState(false)
  const [isChangedSuccessfully, setChangedSuccessfully] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')

      const error = params.get('error')
      const errorDescription = params.get('error_description')

      if (error) {
        const decodedMessage = decodeURIComponent(errorDescription || '')
        setMessage(`Error: ${decodedMessage}`)
        setHasError(true)
        if (decodedMessage.includes('Email link is invalid or has expired')) {
          setIsLinkExpired(true)
        }
      } else if (accessToken) {
        setToken(accessToken)
      } else {
        setMessage('No access token found in URL.')
        router.push('/404')
        setHasError(true)
      }
    }
  }, [router])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    if (password !== repeatPassword) {
      setMessage('Passwords do not match.')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setMessage('Failed to reset password: ' + error.message)
      } else {
        setMessage('Password reset successfully.')
        setChangedSuccessfully(true)
        setTimeout(() => {
          router.push('/login')
        }, 8000)
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
      console.error('Password reset error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTryAgain = () => {
    router.push('/forgot-password')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          {isLinkExpired
            ? 'Email Link is Invalid or Has Expired'
            : isChangedSuccessfully
              ? 'Password reset successfully.'
              : 'Create New Password'}
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          {isLinkExpired
            ? 'Please try resetting your password again.'
            : isChangedSuccessfully
              ? 'Thanks for setting a new password for your account.'
              : "Set a new password for your account. Make sure it's strong and secure."}
        </p>
        {!isChangedSuccessfully && !isLinkExpired && (
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='rounded-md shadow-sm'>
              <div>
                <label htmlFor='password' className='sr-only'>
                  New Password
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    name='password'
                    type={passwordShown ? 'text' : 'password'}
                    autoComplete='new-password'
                    required
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='New password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='z-40 absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <button
                      type='button'
                      onClick={() => setPasswordShown(!passwordShown)}
                      className='text-gray-600'
                    >
                      {passwordShown ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor='repeat-password' className='sr-only'>
                  Repeat New Password
                </label>
                <div className='relative'>
                  <input
                    id='repeat-password'
                    name='repeatPassword'
                    type={repeatPasswordShown ? 'text' : 'password'}
                    autoComplete='new-password'
                    required
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    placeholder='Repeat new password'
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <div className='z-40 absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <button
                      type='button'
                      onClick={() =>
                        setRepeatPasswordShown(!repeatPasswordShown)
                      }
                      className='text-gray-600'
                    >
                      {repeatPasswordShown ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {message && (
              <div className='my-4 text-center text-sm text-red-600'>
                {message}
              </div>
            )}
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-50' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create New Password'}
              </button>
            </div>
          </form>
        )}
        {isChangedSuccessfully && (
          <button
            type='button'
            onClick={handleLogin}
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Go to Login
          </button>
        )}
        {isLinkExpired && (
          <button
            type='button'
            onClick={handleTryAgain}
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
