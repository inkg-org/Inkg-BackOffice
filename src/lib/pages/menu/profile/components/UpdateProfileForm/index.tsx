'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ModalBody } from '@/src/components/molecules/Modal/components/ModalBody'
import Input from '@/src/components/atoms/Input'
import Button from '@/src/components/atoms/Button'
import { label } from './Styles'
import { CLAN, GENDER, EYE_COLORS, HAIR_COLORS, STATE_CODES } from './type'
import { updateUserSchema } from '@/src/lib/types/updateUser'
// import { profileApiToForm, profileFormToApi } from '@/src/lib/utils/mapper'
// import { UpdateProfileApiPayload } from '@/src/lib/types/updateUserToApi'
import useUpdateProfile, {
  UpdateProfileFormData
} from '@/src/lib/adapters/Mutation/updateUser'

export interface EditProfileProps {
  onSuccess?: () => void
  data: UpdateProfileFormData
}

export const UpdateProfileForm = ({ data, onSuccess }: EditProfileProps) => {
  const {
    control,
    handleSubmit,
    reset
  } = useForm<UpdateProfileFormData>({
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
          <div>
            <Input.TextField
              name='firstName'
              control={control}
              label='First Name'
              type='text'
              position='top'
              placeholder='First name'
            />
          </div>
          <div>
            <label className={` ${label}`}>Middle Name</label>

            <Input.TextField
              name='middleName'
              control={control}
              type='text'
              position='middle'
              placeholder='Last name'
            />
          </div>
          <div>
            <label className={` ${label}`}>Last Name</label>

            <Input.TextField
              name='lastName'
              control={control}
              type='text'
              position='middle'
              placeholder='Address'
            />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div>
            <label className={` ${label}`}>Country</label>
            <Input.TextField
              name='country'
              control={control}
              type='text'
              position='top'
              placeholder='country'
            />
          </div>
          <div>
            <label className={` ${label}`}>State</label>
            <Input.Select
              name='state'
              position='top'
              control={control}
              placeholder='Select State'
              options={STATE_CODES.map((option) => ({
                label: option,
                value: option
              }))}
            />
          </div>
          <div>
            <label className={` ${label}`}>City</label>
            <Input.TextField
              name='city'
              control={control}
              type='text'
              placeholder='City'
              position='bottom'
            />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div>
            <label className={` ${label}`}>ZIP Code</label>

            <Input.TextField
              name='zipCode'
              control={control}
              type='text'
              placeholder='ZIP Code'
              position='bottom'
            />
          </div>
          <div>
            <label className={` ${label}`}>Address</label>

            <Input.TextField
              name='address'
              control={control}
              type='text'
              placeholder='Address'
              position='bottom'
            />
          </div>
          <div>
            <label className={` ${label}`}>Secondary Address</label>
            <Input.TextField
              name='secondaryAddress'
              control={control}
              type='text'
              placeholder='Secondary Address'
              position='bottom'
            />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div>
            <label className={` ${label}`}>Phone</label>

            <Input.TextField
              name='phone'
              control={control}
              type='text'
              placeholder='Phone'
              position='bottom'
            />
          </div>
          <div>
            <label className={` ${label}`}>Certificate Number</label>

            <Input.TextField
              name='certificateNumber'
              control={control}
              type='text'
              placeholder='Certificate Number'
              position='bottom'
            />
          </div>
          <div>
            <label className={` ${label}`}>Nationality</label>
            <Input.TextField
              name='nacionality'
              control={control}
              type='text'
              position='bottom'
              placeholder='Nationality'
            />
          </div>
        </div>

        <div className='grid grid-cols-4 gap-2'>
          <div>
            <label className={` ${label}`}>Birth Date</label>
            <Input.TextField
              name='birth'
              control={control}
              type='date'
              position='bottom'
            />
          </div>
          <div>
            <label className={` ${label}`}>Birth Place</label>
            <Input.TextField
              name='birthPlace'
              control={control}
              type='text'
              position='bottom'
              placeholder='Birth place'
            />
          </div>
          <div>
            <label className={` ${label}`}>Gender</label>
            <Input.Select
              name='gender'
              control={control}
              placeholder='Select Gender'
              position='bottom'
              options={GENDER.map((option) => ({
                label: option,
                value: option
              }))}
            />
          </div>
          <div>
            <label className={` ${label}`}>Clan</label>
            <Input.Select
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
        </div>
        <div className='grid grid-cols-4 gap-2'>
          <div>
            <label className={` ${label}`}>Height</label>
            <Input.TextField
              name='height'
              control={control}
              position='bottom'
              type='text'
              placeholder='Height'
            />
          </div>
          <div>
            <label className={` ${label}`}>Weight</label>
            <Input.TextField
              name='weight'
              control={control}
              position='bottom'
              type='number'
              placeholder='Weight'
            />
          </div>
          <div>
            <label className={` ${label}`}>Eye Color</label>
            <Input.Select
              name='eyeColor'
              control={control}
              placeholder='Select Eye Color'
              position='bottom'
              options={EYE_COLORS.map((option) => ({
                label: option,
                value: option
              }))}
            />
          </div>
          <div>
            <label className={` ${label}`}>Hair Color</label>
            <Input.Select
              name='hairColor'
              control={control}
              placeholder='Select Clan'
              options={HAIR_COLORS.map((option) => ({
                label: option,
                value: option
              }))}
            />
          </div>
        </div>

        <Button.FilledButton
          type='submit'
          className='mt-4 w-full items-center'
          isLoading={isPending}
        >
          Update Profile
        </Button.FilledButton>
      </form>
    </ModalBody>
  )
}
