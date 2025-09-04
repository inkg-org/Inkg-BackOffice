'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createUserSchema, CreateUserSchema } from '@/src/lib/types/createUser'
import { createUser } from '@/src/lib/adapters/Mutation/createUser'
import { input, label } from './Styles'

export default function CreateCitizenForm() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setSuccess(true)
      reset()
    },
    onError: (error: any) => {
      console.error('Error:', error)
    }
  })

  const onSubmit = (data: CreateUserSchema) => {
    console.log('Form data:', data)
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <h3 className='font-bold text-xl'>Access Information</h3>
      <div className='grid grid-cols-3 gap-4'>
        <div className='w-full'>
          <label className={` ${label}`}>Email</label>
          <input
            {...register('email')}
            placeholder='Mail@example.com'
            className={`${input} ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>Password</label>
          <input
            {...register('password')}
            placeholder='Password'
            type='password'
            className={` ${input}`}
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>Role</label>
          <select {...register('role')} className={` ${input}`}>
            <option value=''>Select role</option>
            <option value='citizen'>Citizen</option>
            <option value='admin'>Admin</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm'>{errors.role.message}</p>
          )}
        </div>
      </div>
      <h3 className='font-bold text-xl'>Citizen Information</h3>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <label className={` ${label}`}>First Name</label>
          <input
            {...register('first_name')}
            placeholder='First Name'
            className={` ${input}`}
          />
          {errors.role && (
            <p className='text-red-500 text-sm'>{errors.first_name?.message}</p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>Middle Name</label>
          <input
            {...register('middle_name')}
            placeholder='Middle Name'
            className={` ${input}`}
          />
        </div>
        <div>
          <label className={` ${label}`}>Last Name</label>
          <input
            {...register('last_name')}
            placeholder='Last Name'
            className={` ${input}`}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className={` ${label}`}>Address</label>
          <input
            {...register('address')}
            placeholder='Address'
            className={` ${input}`}
          />
        </div>
        <div>
          <label className={` ${label}`}>Secondary Address</label>
          <input
            {...register('secondary_address')}
            placeholder='Secondary Address'
            className={` ${input}`}
          />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <input
          {...register('city')}
          placeholder='City'
          className={` ${input}`}
        />
        <input
          {...register('state')}
          placeholder='State'
          className={` ${input}`}
        />
        <input
          {...register('country')}
          placeholder='Country'
          className={` ${input}`}
        />
        <input
          {...register('zip_code')}
          placeholder='ZIP Code'
          className={` ${input}`}
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <input
          {...register('phone')}
          placeholder='Phone'
          className={` ${input}`}
        />
        <input
          {...register('certificate_number')}
          placeholder='Certificate #'
          className={` ${input}`}
        />
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <input
          {...register('birth')}
          placeholder='Birthdate'
          type='text'
          className={` ${input}`}
        />
        <input
          {...register('DOB_short')}
          placeholder='DOB short'
          className={` ${input}`}
        />
        <input
          {...register('birth_place')}
          placeholder='Birth Place'
          className={` ${input}`}
        />
        <input
          {...register('nacionality')}
          placeholder='Nationality'
          className={` ${input}`}
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <select {...register('gender')} className={` ${input}`}>
          <option value=''>Select gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
        <select {...register('clan')} className={` ${input}`}>
          <option value=''>Select clan</option>
          <option value='Wolf Clan'>Wolf Clan</option>
          <option value='Turtle Clan'>Turtle Clan</option>
          <option value='Bear Clan'>Bear Clan</option>
        </select>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <input
          {...register('height')}
          placeholder='Height'
          className={` ${input}`}
        />
        <input
          {...register('weight')}
          placeholder='Weight'
          type='number'
          className={` ${input}`}
        />
        <select {...register('eye_color')} className={` ${input}`}>
          <option value=''>Select Eye colors</option>
          <option value='BRO'>BRO</option>
          <option value='BLK'>BLK</option>
          <option value='BLU'>BLU</option>
          <option value='GRN'>GRN</option>
          <option value='GRY'>GRY</option>
          <option value='HAZ'>HAZ</option>
          <option value='MAR'>MAR</option>
          <option value='PNK'>PNK</option>
          <option value='DIC'>DIC</option>
          <option value='UNK'>UNK</option>
        </select>
        <select {...register('hair_color')} className={` ${input}`}>
          <option value=''>Select Hair colors</option>
          <option value='BAL'>BAL</option>
          <option value='BLK'>BLK</option>
          <option value='BLN'>BLN</option>
          <option value='BRO'>BRO</option>
          <option value='GRY'>GRY</option>
          <option value='RED'>RED</option>
          <option value='WHI'>WHI</option>
          <option value='SDY'>SDY</option>
          <option value='UNK'>UNK</option>
          <option value='BLU'>BLU</option>
          <option value='GRN'>GRN</option>
        </select>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <input
          {...register('sign')}
          placeholder='Sign'
          className={` ${input}`}
        />
        <input
          {...register('fingerprints')}
          placeholder='Fingerprints (text or URL)'
          className={` ${input}`}
        />
        <input
          {...register('clan_image')}
          placeholder='Clan image URL'
          className={` ${input}`}
        />
        <input
          {...register('photo')}
          placeholder='Photo URL'
          className={` ${input}`}
        />
      </div>

      {success && (
        <p className='text-green-600 font-medium'>
          ✅ User created successfully
        </p>
      )}

      {Object.keys(errors).length > 0 && (
        <div className='text-red-500'>
          Please fill out all required fields correctly.
        </div>
      )}

      <button
        type='submit'
        className='px-6 py-4 bg-blue-600 text-white rounded hover:bg-blue-900 w-full'
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
