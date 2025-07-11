import publicPaths from '@/src/lib/images'
import Image from 'next/image'
import React from 'react'

interface Credential {
  id: string
  credential_name: string
  created_at: string
}

interface Profile {
  first_name: string
  last_name: string
  created_at: string
}

interface TimelineProps {
  profile: Profile
  credentials: Credential[]
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(date)
}

const timeAgo = (dateStr: string) => {
  const now = new Date()
  const then = new Date(dateStr)
  const diffMs = now.getTime() - then.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

const Timeline = ({ profile, credentials }: TimelineProps) => {
  return (
    <div className='mt-8 border border-gray-300 p-3 rounded-md'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>Timeline</h3>

      <div className='space-y-6'>
        {credentials.map((cred) => (
          <div key={cred.id} className='flex items-start space-x-4'>
            <Image
              src={publicPaths.assets.user_placeholder}
              alt='Credential'
              className='w-10 h-10 rounded-full border-2 border-blue-500'
              width={200}
              height={200}
            />
            <div>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>
                  {profile.first_name} {profile.last_name}
                </span>{' '}
                was issued the{' '}
                <span className='font-semibold'>{cred.credential_name}</span>{' '}
                credential.
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                On {formatDate(cred.created_at)} – {timeAgo(cred.created_at)}
              </p>
            </div>
          </div>
        ))}
        <div className='flex items-start space-x-4'>
          <Image
            src={publicPaths.assets.user_placeholder}
            alt='User'
            className='w-10 h-10 rounded-full border-2 border-blue-500'
            width={200}
            height={200}
          />
          <div>
            <p className='text-sm text-gray-600'>
              <span className='font-medium'>
                {profile.first_name} {profile.last_name}
              </span>{' '}
              became a citizen of Ierahkwa Ne Kanienke.
            </p>
            <p className='text-xs text-gray-400 mt-1'>
              On {formatDate(profile.created_at)} –{' '}
              {timeAgo(profile.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
