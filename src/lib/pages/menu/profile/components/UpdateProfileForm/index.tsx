'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ModalBody } from '@/src/components/molecules/Modal/components/ModalBody'
import Input from '@/src/components/atoms/Input'
import Button from '@/src/components/atoms/Button'
import { CLAN, GENDER, EYE_COLORS, HAIR_COLORS, STATE_CODES } from './type'
import { updateUserSchema } from '@/src/lib/types/updateUser'
import useUpdateProfile, {
  UpdateProfileFormData
} from '@/src/lib/adapters/Mutation/updateUser'

export interface EditProfileProps {
  onSuccess?: () => void
  data: UpdateProfileFormData
}

export const UpdateProfileForm = ({ data, onSuccess }: EditProfileProps) => {
  const { control, handleSubmit, reset } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      ...data
    }
  })

  const { mutate, isPending } = useUpdateProfile({
    options: {
      onSuccess: () => {
        reset({})
        onSuccess?.()
      }
    }
  })

  const onSubmit = useCallback(
    (data: UpdateProfileFormData) => {
      console.log('✅ Formulario enviado con:', data)
      mutate(data)
    },
    [mutate]
  )

  return (
    <ModalBody key={Date.now()}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log('❌ Errores en el formulario:', errors)
        })}
      >
        <div className='grid grid-cols-3 gap-2'>
          <Input.TextField
            name='firstName'
            control={control}
            label='First Name'
            type='text'
            position='top'
            placeholder='First name'
          />
          <Input.TextField
            label='Middle Name'
            name='middleName'
            control={control}
            type='text'
            position='middle'
            placeholder='Last name'
          />
          <Input.TextField
            label='Last Name'
            name='lastName'
            control={control}
            type='text'
            position='middle'
            placeholder='Address'
          />
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <Input.TextField
            label='Country'
            name='country'
            control={control}
            type='text'
            position='top'
            placeholder='country'
          />
          <Input.Select
            label='State'
            name='state'
            position='top'
            control={control}
            placeholder='Select State'
            options={STATE_CODES.map((option) => ({
              label: option,
              value: option
            }))}
          />
          <Input.TextField
            label='City'
            name='city'
            control={control}
            type='text'
            placeholder='City'
            position='bottom'
          />
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <Input.TextField
            label='Zip Code'
            name='zipCode'
            control={control}
            type='text'
            placeholder='ZIP Code'
            position='bottom'
          />
          <Input.TextField
            label='Address'
            name='address'
            control={control}
            type='text'
            placeholder='Address'
            position='bottom'
          />
          <Input.TextField
            label='Secondary Address'
            name='secondaryAddress'
            control={control}
            type='text'
            placeholder='Secondary Address'
            position='bottom'
          />
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <Input.TextField
            label='Phone'
            name='phone'
            control={control}
            type='text'
            placeholder='Phone'
            position='bottom'
          />
          <Input.TextField
            name='certificateNumber'
            label='Certificate Number'
            control={control}
            type='text'
            placeholder='Certificate Number'
            position='bottom'
          />
          <Input.TextField
            label='Nationality'
            name='nacionality'
            control={control}
            type='text'
            position='bottom'
            placeholder='Nationality'
          />
        </div>
        <div className='grid grid-cols-4 gap-2'>
            <Input.TextField
            label='Birth Date'
              name='birth'
              control={control}
              type='date'
              position='bottom'
            />
            <Input.TextField
            label='Birth Place'
              name='birthPlace'
              control={control}
              type='text'
              position='bottom'
              placeholder='Birth place'
            />
            <Input.Select
            label='Gender'
              name='gender'
              control={control}
              placeholder='Select Gender'
              position='bottom'
              options={GENDER.map((option) => ({
                label: option,
                value: option
              }))}
            />
            <Input.Select
            label='Clan'
              name='clan'
              control={control}
              position='bottom'
              placeholder='Select Clan'
              options={CLAN.map((option) => ({
                label: option,
                value: option
              }))}
            />
        </div>
        <div className='grid grid-cols-4 gap-2'>
            <Input.TextField
            label='Height'
              name='height'
              control={control}
              position='bottom'
              type='text'
              placeholder='Height'
            />
            <Input.TextField
            label='Weight'
              name='weight'
              control={control}
              position='bottom'
              type='number'
              placeholder='Weight'
            />
            <Input.Select
            label='Eye Color'
              name='eyeColor'
              control={control}
              placeholder='Select Eye Color'
              position='bottom'
              options={EYE_COLORS.map((option) => ({
                label: option,
                value: option
              }))}
            />
            <Input.Select
            label='Hair Color'
              name='hairColor'
              control={control}
              placeholder='Select Clan'
              options={HAIR_COLORS.map((option) => ({
                label: option,
                value: option
              }))}
            />
        </div>

        <Button.FilledButton
          type='submit'
          className='mt-4 w-full items-center justify-center py-2'
          isLoading={isPending}
        >
          Update Profile
        </Button.FilledButton>
      </form>
    </ModalBody>
  )
}
