'use client'

import FilledButton from '@/src/components/atoms/Button/FilledButton'
import TextButton from '@/src/components/atoms/Button/TextButton'
import Table from '@/src/components/organisms/Table'
import useGetCredentials from '@/src/lib/adapters/Query/Credentials'
import useUserProvider from '@/src/lib/providers/UserProvider'
import { getCredentialDates } from '@/src/lib/utils/getCredentialDates'
import React from 'react'
import { FiDownload } from 'react-icons/fi'

const CredentialsPage = () => {
  const user = useUserProvider((state) => state.user)
  const userId = user?.id

  const { data } = useGetCredentials({ userId })

  console.log('data', data)
  return (
    <div>
      <h2 className='text-4xl font-semibold text-gray-800 mb-4'>Credentials</h2>
      <p className='mb-12'>
        Here you can find all the documents that you earned being a Akwesasne
        citizen
      </p>
      <Table
        id='credentials'
        cols={['#', 'Name', 'Expedition date', 'Expiration date', '', '']}
        rows={data?.map((row, index) => {
          const { issue, expiration } = getCredentialDates(
            row.credential_name,
            row
          )

          return {
            id: row.id,
            values: [
              <p key={`index-${row.id}`}>{index + 1}</p>,
              row.credential_name,
              <p key={`issue-${row.id}`}>{issue || 'N/A'}</p>,
              <p
                key={`expiration-${row.id}`}
                className={`${
                  expiration && new Date(expiration) < new Date()
                    ? 'text-red-600'
                    : 'text-gray-800'
                }`}
              >
                {expiration || 'N/A'}
              </p>,
              <div
                key={`view-${row.id}`}
                className='flex items-center justify-center'
              >
                <FilledButton>View</FilledButton>
              </div>,
              <div
                key={`download-${row.id}`}
                className='flex items-center justify-center'
              >
                <TextButton className='flex items-center gap-1 hover:text-MainBlue'>
                  Download <FiDownload className='mx-auto cursor-pointer' />
                </TextButton>
              </div>
            ]
          }
        })}
      />
    </div>
  )
}

export default CredentialsPage
