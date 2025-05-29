import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          404 - Página no encontrada
        </h1>
        <p className='mt-2 text-center text-sm text-gray-600'>
          La página que estás buscando no existe.
        </p>
        <button
          type='button'
          onClick={handleLogin}
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        ></button>
      </div>
    </div>
  )
}
