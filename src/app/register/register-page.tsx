'use client'

import { useState, FormEvent, useEffect } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'
import LottieSuccess from '@/src/components/atoms/Lottie/LottieSuccess'
import LottieBackground from '@/src/components/atoms/Lottie/LottieBackground'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/utils/supabase/client'
import publicPaths from '@/src/lib/images'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setIsSuccess] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const supabase = createClient()

  const router = useRouter()

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 15000)

      return () => clearTimeout(timer)
    }
  }, [success, router])

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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          repeatPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (data.user) {
        setMessage('Registration successful.')
        setIsSuccess(true)
      } else {
        setMessage(data.message)
        setIsSuccess(false)
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || 'An unexpected error occurred'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async () => {
    console.log('GOOGLE ENTRA')
    setGoogleLoading(true)
    let response
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/authgoogle`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
    } catch (error) {
      console.error('Google Sign In was unsuccessful. Try Again Later', error)
      setMessage('Google Sign In was unsuccessful. Try again later.')
    }
    console.log('Google response:', response)
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const handleBack = () => {
    router.back()
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  if (success) {
    return (
      <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Tu cuenta ha sido registrada!
          </h2>
          <LottieSuccess />
          <button
            type='submit'
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50' : ''
            }`}
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    )
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
        ← Volver atrás
      </button>

      <div className='max-w-md w-full space-y-4 z-50'>
        <div className='flex justify-center'>
          <Image
            src={publicPaths.identity.logo}
            alt='Logo'
            width={60}
            height={60}
          />
        </div>
        <h2 className=' text-center text-3xl font-extrabold text-gray-900'>
          Registra tu cuenta
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 '>
          Crea una cuenta nueva llenando tus datos a continuación.
        </p>
        <form className='mt-8 space-y-6 ' onSubmit={handleSubmit}>
          <div className='text-xl leading-5 font-black'>
            <button
              type='submit'
              className={`group relative w-full flex justify-center py-2 px-4 border-2 text-sm rounded-md border-gray-400 text-slate-800 font-semibold bg-wh hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50' : ''
              }`}
              onClick={handleGoogleSuccess}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <div
                  className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full'
                  role='status'
                >
                  <span className='visually-hidden'></span>
                </div>
              ) : (
                <>
                  <FcGoogle className='w-4 h-4 mr-2 ' />
                  Entra con Google
                </>
              )}
            </button>
          </div>
          <div className='rounded-md shadow-sm'>
            <div>
              <label htmlFor='first-name' className='sr-only'>
                Nombre
              </label>
              <input
                id='first-name'
                name='firstName'
                type='text'
                autoComplete='given-name'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='last-name' className='sr-only'>
                Apellido
              </label>
              <input
                id='last-name'
                name='lastName'
                type='text'
                autoComplete='family-name'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Correo electrónico
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Contraseña
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={passwordShown ? 'text' : 'password'}
                  autoComplete='new-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-xl leading-5 z-40'>
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
                Repite tu contraseña
              </label>
              <div className='relative'>
                <input
                  id='repeat-password'
                  name='repeatPassword'
                  type={repeatPasswordShown ? 'text' : 'password'}
                  autoComplete='new-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Repeat password'
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-xl leading-5 z-40'>
                  <button
                    type='button'
                    onClick={() => setRepeatPasswordShown(!repeatPasswordShown)}
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

          <div>
            <button
              type='submit'
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <div className='z-10 text-center mt-2'>
              <p
                className='underline mt-3 text-center font-black text-sm text-indigo-700 hover:text-indigo-400 cursor-pointer'
                onClick={handleLogin}
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </p>
              <p
                className='underline mt-10 text-sm text-indigo-700 hover:text-indigo-400 cursor-pointer'
                onClick={handleForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
