'use client'

import React, { useEffect, useState } from 'react'
import { useMenuStore } from '../_state/provider'
import FallbackImage from '@/src/components/atoms/FallbackImage'
import publicPaths from '@/src/lib/images'

export default function Header() {
  const { user } = useMenuStore((store) => store)
  const [userEmail, setUserEmail] = useState<string | undefined>()
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>()

  useEffect(() => {
    if (user) {
      setUserEmail(user.email ?? '')
      setAvatarUrl(user.user_metadata?.avatar_url)
    }
  }, [user])

  return (
    <header className='bg-white px-4 shadow p-2 flex justify-between items-center z-40 fixed top-0 w-full'>
              <div className='flex gap-4'>
        <FallbackImage
            src={ publicPaths.identity.logo}
            fallbackSrc={publicPaths.identity.logo}
            alt='logo'
            width={50}
            height={50}
          />
          <div className='flex flex-col justify-center'>
          <p className='font-medium text-sm'>Ierahkwa Ne Kanienke Goverment</p>
          <p className='font-medium text-xs'>Official Citizens Web App</p>
          </div>
        </div>
      <div className='flex items-center justify-end flex-1'>
        <div className='align-middle p-2 inline-block hover:bg-gray-200 hover:rounded-xl hover:cursor-pointer'>
          <FallbackImage
            src={avatarUrl ?? publicPaths.assets.user_placeholder}
            fallbackSrc={publicPaths.assets.user_placeholder}
            alt='User Avatar'
            width={40}
            height={40}
            className='h-[40px] w-[40px] rounded-full border-slate-900 border-2 inline-block align-middle'
          />
          <span className='ml-2 text-sm text-gray-800 underline cursor-pointer inline-block align-baseline mt-1'>
            {userEmail}
          </span>
        </div>
      </div>
    </header>
  )
}
