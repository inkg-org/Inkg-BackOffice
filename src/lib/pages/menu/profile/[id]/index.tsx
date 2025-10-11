'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import publicPaths from '@/src/lib/images'
import FilledButton from '@/src/components/atoms/Button/FilledButton'
import { IoOpenOutline } from 'react-icons/io5'
import useGetCredentials from '@/src/lib/adapters/Query/Credentials'
import LottieLoader from '@/src/components/atoms/Lottie/LottieLoader'
import Timeline from '../components/Timeline'
import About from '../components/About'
import { useParams } from 'next/navigation'
import { useGetProfile } from '@/src/lib/adapters/Query/Profile'
import { Modal } from '@/src/components/molecules/Modal'
import { UpdateProfileForm } from '../components/UpdateProfileForm'
import { useQueryClient } from '@tanstack/react-query'
import EmptyButton from '@/src/components/atoms/Button/EmptyButton'
import { UpdateAccessForm } from '../components/UpdateAccessForm'
import { getAuthUser } from '@/src/lib/adapters/Query/Accesses'

const SingleProfile = () => {
  const params = useParams()
  const userId = params?.id as string
  const [tab, setTab] = useState<'timeline' | 'about'>('about')
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const [openEditAccess, setOpenEditAccess] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const queryClient = useQueryClient()

  const { data: profile, isLoading: isLoadingProfile } = useGetProfile(userId)
  const { data: credentials, isLoading: isLoadingCredentials } =
    useGetCredentials(profile?.id)

  const fetchUser = useCallback(async () => {
    try {
      if (!userId) return
      setIsLoadingUser(true)
      const fetchedUser = await getAuthUser(userId)
      setUser(fetchedUser)
    } catch (error) {
      console.error('❌ Error fetching auth user:', error)
    } finally {
      setIsLoadingUser(false)
    }
  }, [userId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (isLoadingProfile || isLoadingCredentials || isLoadingUser) {
    return <LottieLoader />
  }

  return (
    <div>
      <div className='flex gap-6'>
        <div className='w-1/4 flex flex-col items-center'>
          <Image
            src={publicPaths.assets.user_placeholder}
            alt='Profile'
            width={200}
            height={200}
            className='rounded-md object-cover'
          />
          <div className='mt-6 space-y-4 text-md'>
            <div>
              <h4 className='font-bold text-gray-700'>Credentials</h4>
              <ul className='pl-5 text-gray-600 py-3 space-y-2'>
                {credentials && credentials.length > 0 ? (
                  credentials.map((item, index: number) => (
                    <li
                      key={index}
                      className='flex items-start justify-left gap-x-2'
                    >
                      <span className='list-item list-disc pl-1'>
                        {item.credential_name}
                      </span>
                      <span className='bg-gray-100 text-blue-600 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-200 text-md'>
                        <IoOpenOutline />
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No credentials found</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className='w-3/4 space-y-6'>
          <div className='flex justify-between pb-4'>
            <div>
              <h2 className='text-4xl font-semibold text-gray-800'>
                {profile?.first_name ? profile.first_name : 'Unavailable'}{' '}
                {profile?.middle_name} {profile?.last_name}
              </h2>
              <p className='text-md text-gray-500'>
                Certificate Number:{' '}
                {profile?.certificate_number
                  ? profile.certificate_number
                  : 'Unavailable'}
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <FilledButton
                className='px-10 py-2'
                onClick={() => setOpenEditProfile(true)}
              >
                Edit Profile
              </FilledButton>
              <EmptyButton
                className='px-10 py-2'
                onClick={() => setOpenEditAccess(true)}
              >
                Edit Accesses
              </EmptyButton>
            </div>
          </div>

          <div className='border-b border-gray-300 flex justify-center'>
            <button
              className={`px-4 py-2 text-md font-medium ${
                tab === 'about'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600'
              }`}
              onClick={() => setTab('about')}
            >
              About
            </button>
            <button
              className={`px-4 py-2 text-md font-medium ${
                tab === 'timeline'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600'
              }`}
              onClick={() => setTab('timeline')}
            >
              Timeline
            </button>
          </div>

          {tab === 'about' && (
            <About profile={profile} userEmail={user?.email} />
          )}
          {tab === 'timeline' && profile && (
            <Timeline profile={profile} credentials={credentials || []} />
          )}
        </div>
      </div>

      {openEditProfile && profile && (
        <Modal
          id='update-profile'
          isActive={openEditProfile}
          onChange={setOpenEditProfile}
          body={
            <UpdateProfileForm
              data={{
                ...profile!,
                firstName: profile!.first_name,
                middleName: profile!.middle_name,
                lastName: profile!.last_name,
                zipCode: profile!.zip_code,
                certificateNumber: profile!.certificate_number,
                secondaryAddress: profile!.secondary_address,
                eyeColor: profile!.eye_color,
                hairColor: profile!.hair_color,
                birthPlace: profile!.birth_place
              }}
              onSuccess={async () => {
                queryClient.invalidateQueries({ queryKey: ['profile', userId] })
                await fetchUser()
                setOpenEditAccess(false)
              }}
            />
          }
        />
      )}

      {openEditAccess && profile && user && (
        <Modal
          id='update-profile-access'
          isActive={openEditAccess}
          onChange={setOpenEditAccess}
          body={
            <UpdateAccessForm
              data={{
                id: user.id,
                email: user.email,
                role: user.user_metadata?.role ?? ''
              }}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['profile', userId] })
                setOpenEditAccess(false)
              }}
            />
          }
        />
      )}
    </div>
  )
}

export default SingleProfile
