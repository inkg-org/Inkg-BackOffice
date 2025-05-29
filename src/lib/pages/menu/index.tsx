'use client'

import FilledButton from '@/src/components/atoms/Button/FilledButton'
import Link from 'next/link'
import React from 'react'
import {
  IoCardOutline,
  IoDocumentOutline,
  IoHelpCircleOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoTrophyOutline
} from 'react-icons/io5'
import useUserProvider from '@/src/lib/providers/UserProvider'
import useGetProfile from '../../adapters/Query/Profile'
import LottieLoader from '@/src/components/atoms/Lottie/LottieLoader'
import Image, { StaticImageData } from 'next/image'
import publicPaths from '../../images'

interface Counts {
  companies: number | null
  products: number | null
  customer: number | null
  vehicles: number | null
  drivers: number | null
  trackings: number | null
  settings: number | null
  help: number | null
}

interface MenuItemsProps {
  name: string
  route: string
  icon: React.ElementType
  key: keyof Counts
  description: string
  image: StaticImageData | string
}

const MenuItems: MenuItemsProps[] = [
  {
    name: 'Credentials',
    route: '/credentials',
    icon: IoCardOutline,
    key: 'companies',
    description:
      'Allows you to accedd to all the credentials of you citizenship.',
    image: publicPaths.assets.credentialBanner
  },
  {
    name: 'Profile',
    route: '/profile',
    icon: IoPersonOutline,
    key: 'customer',
    description:
      'Shows all the personal information linked to your citizenship.',
    image: publicPaths.assets.profileBanner
  },

  {
    name: 'Benefits',
    route: '/benefits',
    icon: IoTrophyOutline,
    key: 'vehicles',
    description:
      'Access all the benefits you’re entitled to as a citizen of Ierahkwa Ne Kanienke.',
    image: publicPaths.assets.benefitsBanner
  },
  {
    name: 'Settings',
    route: '/settings',
    icon: IoSettingsOutline,
    key: 'settings',
    description:
      'Customize your experience by managing preferences, personal data, and security settings.',
    image: publicPaths.assets.settingsBanner
  },
  {
    name: 'Documents',
    route: '/documents',
    icon: IoDocumentOutline,
    key: 'help',
    description:
      'Find all your official documents, legal proofs, and certificates in one secure place.',
    image: publicPaths.assets.documentsBanner
  },
  {
    name: 'Help',
    route: '/help',
    icon: IoHelpCircleOutline,
    key: 'help',
    description:
      'Get guidance and support for any citizenship-related issue.',
    image: publicPaths.assets.helpBanner
  }
]

export default function MenuPage() {
  const user = useUserProvider((state) => state.user)
  const userId = user?.id

  const { data: profile, isLoading } = useGetProfile({ userId })

  if (isLoading) return <LottieLoader />
  return (
    <div>
      <div className='flex align-middle justify-center'>
        <div>
          <h1 className='text-4xl font-bold pb-6 text-center'>
            {' '}
            Hello, {profile?.first_name}
          </h1>
          <p>
            Here you will find all your citizen information, documents, assets
            and support.
          </p>
        </div>
      </div>
      <div className='flex justify-center pt-12 gap-6 flex-wrap items-start'>
        {MenuItems.map((item) => (
          <Link
            href={`/menu${item.route}`}
            key={item.name}
            className='w-3/4 sm:w-[48%] lg:w-[35%]'
          >
            <div
              className='flex justify-center items-center shadow-xl hover:shadow-2xl transition-shadow rounded-lg'
              key={item.name}
            >
              <Image
                src={item.image}
                alt='Credentials'
                width={100}
                height={800}
                className='-p-8 rounded-s-xl'
              />
              <div className='flex flex-col items-start justify-center p-4'>
                <div className='flex items-center justify-start gap-2'>
                  <p className='text-MainBlue font-bold text-2xl'>
                    {item.name}{' '}
                  </p>
                  <span className={'flex justify-center text-MainBlue pr-4'}>
                    <item.icon className='w-7 h-7' />
                  </span>
                </div>
                <p className='text-md'>{item.description}</p>
                <div className='w-full flex justify-end'>
                  <FilledButton
                    icon={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    }
                  >
                    See More
                  </FilledButton>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
