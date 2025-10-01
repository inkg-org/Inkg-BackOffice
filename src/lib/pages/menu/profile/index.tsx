'use client'

import FilledButton from '@/src/components/atoms/Button/FilledButton'
import TextButton from '@/src/components/atoms/Button/TextButton'
import Table from '@/src/components/organisms/Table'
import { useGetAllProfiles } from '@/src/lib/adapters/Query/Profile'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiDownload } from 'react-icons/fi'

const ProfilePage = () => {
  const [query, setQuery] = useState({
    limit_value: 10,
    offset_value: 0,
    search_value: ''
  })
  const [currentPage, setCurrentPage] = useState(0)
  const { data, refetch } = useGetAllProfiles(query)

  const router = useRouter()
  return (
    <div>
      <h2 className='text-4xl font-semibold text-gray-800 mb-4'>Profile</h2>
      <p className='mb-12'>
        Here you can find all the documents that you earned being a Akwesasne
        citizen
      </p>
      <Table
        id='credentials'
        cols={['Name', 'Certificate Number', 'Clan', '', '']}
        rows={data?.profiles?.map((row, index) => {
          return {
            id: row.id,
            values: [
              <p key={`name-${row.id}`}>
                {`${row.first_name ?? ''} ${row.middle_name ?? ''} ${row.last_name ?? ''}` ||
                  'N/A'}
              </p>,
              <p key={`issue-${row.id}`}>{row.certificate_number || 'N/A'}</p>,
              <p key={`clan-${row.id}`}>{row.clan || 'N/A'}</p>,
              <div
                key={`view-${row.id}`}
                className='flex items-center justify-center'
              >
                <FilledButton
                  onClick={() => router.push(`/menu/profile/${row.id}`)}
                >
                  View
                </FilledButton>
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
        refetch={refetch}
        count={data?.count ?? undefined}
        currentPage={currentPage}
        onPaginate={(from, to) => {
          setQuery({ ...query, offset_value: from, limit_value: to })
          setCurrentPage(from / query.limit_value)
        }}
      />
    </div>
  )
}

export default ProfilePage
