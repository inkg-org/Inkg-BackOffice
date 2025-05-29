import publicPaths from '@/src/lib/images'
import Image from 'next/image'
import React from 'react'

const Timeline = () => {
  return (
    <div className='mt-8 border border-gray-300 p-3 rounded-md'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>Timeline</h3>

      <div className='space-y-6'>
        {[1, 2, 3].map((_, i) => (
          <div key={i} className='flex items-start space-x-4'>
            <Image
              src={publicPaths.assets.user_placeholder}
              alt='Company'
              className='w-10 h-10 rounded-full border-2 border-blue-500'
              width={200}
              height={200}
            />
            <div>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Name Placeholder</span> did
                something important.
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                On some date – x days ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
