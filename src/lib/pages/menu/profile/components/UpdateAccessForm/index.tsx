'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ModalBody } from '@/src/components/molecules/Modal/components/ModalBody'
import Input from '@/src/components/atoms/Input'
import Button from '@/src/components/atoms/Button'
import { z } from 'zod'
import Select from '@/src/components/atoms/Input/Select'
import useUpdateAccess, { UpdateAccessFormData } from '@/src/lib/adapters/Mutation/Users/updateAccess'

const updateAccessSchema = z
  .object({
    id: z.string(),
    email: z.string().email('Correo inválido'),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    role: z.string().optional()
  })
  .refine(
    (data) => {
      // Solo valida si el usuario está intentando cambiar la contraseña
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    }
  )

type UpdateAccessFormWithConfirm = z.infer<typeof updateAccessSchema>

export interface EditAccessProps {
  onSuccess?: () => void
  data: UpdateAccessFormData
}

export const UpdateAccessForm = ({ data, onSuccess }: EditAccessProps) => {
  const { control, handleSubmit, reset } = useForm<UpdateAccessFormWithConfirm>(
    {
      resolver: zodResolver(updateAccessSchema),
      defaultValues: {
        ...data
      }
    }
  )

  const { mutate, isPending } = useUpdateAccess({
    options: {
      onSuccess: () => {
        console.log('✅ Usuario actualizado con éxito')
        reset()
        onSuccess?.()
      },
      onError: (error: any) => {
        console.error('❌ Error al actualizar el usuario:', error)
      }
    }
  })

  const onSubmit = useCallback(
    (formData: UpdateAccessFormData) => {
      console.log('➡️ Enviando datos para actualización:', formData)
      const payload = {
        id: formData.id,
        email: formData.email,
        password: formData.password ? formData.password : undefined,
        role: formData.role
      }
      mutate(payload)
    },
    [mutate]
  )

  return (
    <ModalBody key={Date.now()}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log('❌ Errores en el formulario:', errors)
        )}
      >
        <Input.TextField
          name='email'
          control={control}
          label='Email'
          type='email'
          position='top'
          placeholder='Email'
        />
        <div className='grid grid-cols-2 gap-4'>
          <Input.TextField
            label='Password'
            name='password'
            control={control}
            type='password'
            position='middle'
            placeholder='New Password'
          />
          <Input.TextField
            label='Confirm Password'
            name='confirmPassword'
            control={control}
            type='password'
            position='middle'
            placeholder='Confirm New Password'
          />
        </div>

        <Select
          label='Role'
          name='role'
          control={control}
          options={[
            { label: 'Citizen', value: 'Citizen' },
            { label: 'Admin', value: 'Admin' }
          ]}
          placeholder='Select a role'
        />

        <Button.FilledButton
          type='submit'
          className='mt-4 w-full items-center justify-center py-2'
          isLoading={isPending}
        >
          Update Access
        </Button.FilledButton>
      </form>
    </ModalBody>
  )
}
