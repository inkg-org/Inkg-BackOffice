'use client'
import publicPaths from '@/src/lib/images'
import Image from 'next/image'
import React from 'react'

interface AboutProps {
  profile: any
  userEmail?: string
}

const About: React.FC<AboutProps> = ({ profile, userEmail }) => {
  return (
    <div className='grid grid-cols-2 gap-6 text-md text-gray-700'>
      <div className='border border-gray-300 p-3 rounded-md'>
        <h4 className='font-bold text-gray-700 mb-3 text-xl'>
          Contact Information
        </h4>
        <p>
          <strong>Phone:</strong>{' '}
          <span className='text-blue-600'>
            {profile?.phone ? profile.phone : 'Unavailable'}
          </span>
        </p>
        <p>
          <strong>Address:</strong>{' '}
          {profile?.address ? profile.address : 'Unavailable'}{' '}
          {profile?.city ? profile?.city : ' '}
        </p>
        <p>
          <strong>State:</strong>{' '}
          {profile?.state ? profile.state : 'Unavailable'}
        </p>
        <p>
          <strong>Zip code:</strong>{' '}
          {profile?.zip_code ? profile.zip_code : 'Unavailable'}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <span className='text-blue-600 hover:underline'>{userEmail}</span>
        </p>
        <p>
          <strong>Clan:</strong>
        </p>

        {profile?.clan === 'Bear Clan' && (
          <Image
            src={publicPaths.assets.bearClan}
            alt='Bear Clan'
            width={80}
            height={80}
          />
        )}

        {profile?.clan === 'Wolf Clan' && (
          <Image
            src={publicPaths.assets.wolfClan}
            alt='Wolf Clan'
            width={80}
            height={80}
          />
        )}

        {profile?.clan === 'Turtle Clan' && (
          <Image
            src={publicPaths.assets.turtleClan}
            alt='Turtle Clan'
            width={80}
            height={80}
          />
        )}
      </div>
      <div className='border border-gray-300 p-3 rounded-md'>
        <h4 className='font-bold text-gray-700 mb-3 text-xl'>
          Basic Information
        </h4>
        <p>
          <strong>Birthday:</strong>{' '}
          {profile?.birth ? profile.birth : 'Unavailable'}
        </p>
        <p>
          <strong>Gender:</strong>{' '}
          {profile?.gender ? profile.gender : 'Unavailable'}
        </p>
        <p>
          <strong>Nationality:</strong>{' '}
          {profile?.nacionality ? profile.nacionality : 'Unavailable'}
        </p>
        <p>
          <strong>Height:</strong>{' '}
          {profile?.height ? profile.height : 'Unavailable'}
        </p>
        <p>
          <strong>Place of birth:</strong>{' '}
          {profile?.birth_place ? profile.birth_place : 'Unavailable'}
        </p>
        <p>
          <strong>Country:</strong>{' '}
          {profile?.country ? profile.country : 'Unavailable'}
        </p>
        <p>
          <strong>Place of birth:</strong>{' '}
          {profile?.birth_place ? profile.birth_place : 'Unavailable'}
        </p>
      </div>
    </div>
  )
}

export default About
