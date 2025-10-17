'use client'

import React from 'react'
import { ModalBody } from '@/src/components/molecules/Modal/components/ModalBody'
import EmptyButton from '@/src/components/atoms/Button/EmptyButton'
import useDeleteUser from '@/src/lib/adapters/Mutation/Users/deleteUser'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface DeleteModalProps {
  userId: string
  onClose: () => void
}

export const DeleteModal = ({ userId, onClose }: DeleteModalProps) => {
  const { mutate, isPending } = useDeleteUser()
  const queryClient = useQueryClient()
  const router = useRouter()

  const handleDelete = () => {
    mutate(
      { ids: [userId] },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['profiles'] })
          setTimeout(() => {
            router.replace('/menu/profile')
          }, 100)
          onClose()
        },
        onError: (error) => {
          console.error('❌ Error deleting user:', error)
          onClose()
        }
      }
    )
  }

  return (
    <ModalBody key={Date.now()}>
      <div className='py-8'>
        <h4 className='text-center pb-16 text-md'>
          Are you sure? This action cannot be undone, and the data will be
          completely deleted from the database.{' '}
        </h4>
        <div className='grid grid-cols-2 gap-4 px-40'>
          <button
            className={`px-10 py-4 rounded-full text-white font-semibold transition-all ${
              isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:scale-95'
            }`}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
          <EmptyButton
            type='submit'
            className='w-full items-center justify-center py-2'
          >
            Cancel
          </EmptyButton>
        </div>
      </div>
    </ModalBody>
  )
}
