'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { createUserSchema, CreateUserSchema } from '@/src/lib/types/createUser'
import { createUser } from '@/src/lib/adapters/Mutation/createUser'
import { input, label, select } from './Styles'
import { states } from '@/src/lib/utils/statesList'

export default function CreateCitizenForm() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
    setValue
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
      // 👇 Aquí viene lo que tiraste en createUser
      const message = error.message || 'Something went wrong'

      if (message.toLowerCase().includes('email')) {
        setError('email', {
          type: 'server',
          message: 'This email is already registered.'
        })
      } else {
        setError('root', {
          type: 'server',
          message
        })
      }
    }
  })

  const onSubmit = (data: CreateUserSchema) => {
    mutation.mutate(data)
  }

  const birth = watch('birth')
  useEffect(() => {
    if (birth) {
      const [year, month, day] = birth.split('-')
      const yy = year.slice(-2)
      const dobShort = `${month}${day}${yy}`
      setValue('DOB_short', dobShort)
    }
  }, [birth, setValue])

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
          <select {...register('role', { required: true })} className={select}>
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
          {errors.first_name && (
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
          {errors.last_name && (
            <p className='text-red-500 text-sm'>{errors.last_name?.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className={` ${label}`}>Address</label>
          <input
            {...register('address')}
            placeholder='Address'
            className={` ${input}`}
          />{' '}
          {errors.address && (
            <p className='text-red-500 text-sm'>{errors.address?.message}</p>
          )}
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
        <div>
          <label className={` ${label}`}>City</label>
          <input
            {...register('city')}
            placeholder='City'
            className={` ${input}`}
          />
          {errors.city && (
            <p className='text-red-500 text-sm'>{errors.city?.message}</p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>State</label>
          <select
            {...register('state', { required: 'State is required' })}
            className={` ${input}`}
          >
            <option value=''>Select a state</option>
            {states.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={` ${label}`}>Country</label>
          <input
            {...register('country')}
            placeholder='Country'
            className={` ${input}`}
          />{' '}
          {errors.country && (
            <p className='text-red-500 text-sm'>{errors.country?.message}</p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>Zip Code</label>
          <input
            {...register('zip_code')}
            placeholder='ZIP Code'
            className={` ${input}`}
          />
          {errors.zip_code && (
            <p className='text-red-500 text-sm'>{errors.zip_code?.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className={` ${label}`}>Phone</label>
          <input
            {...register('phone')}
            placeholder='Phone'
            className={` ${input}`}
          />{' '}
          {errors.phone && (
            <p className='text-red-500 text-sm'>{errors.phone?.message}</p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>Certificate Number</label>
          <input
            {...register('certificate_number')}
            placeholder='Certificate #'
            className={` ${input}`}
            defaultValue='INKMIA'
          />{' '}
          {errors.certificate_number && (
            <p className='text-red-500 text-sm'>
              {errors.certificate_number?.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <label className={` ${label}`}>Birth Date</label>
          <input
            {...register('birth')}
            placeholder='Birthdate'
            type='date'
            className={` ${input}`}
          />{' '}
          {errors.birth && (
            <p className='text-red-500 text-sm'>{errors.birth?.message}</p>
          )}
        </div>
        <input
          type='hidden'
          {...register('DOB_short')}
          placeholder='DOB short'
          className={` ${input}`}
          readOnly
        />
        <div>
          <label className={` ${label}`}>Birth Place</label>
          <input
            {...register('birth_place')}
            placeholder='Birth Place'
            className={` ${input}`}
          />{' '}
          {errors.birth_place && (
            <p className='text-red-500 text-sm'>
              {errors.birth_place?.message}
            </p>
          )}
        </div>
        <div>
          <label className={` ${label}`}>Nationality</label>
          <input
            {...register('nacionality')}
            placeholder='Nationality'
            className={` ${input}`}
          />{' '}
          {errors.nacionality && (
            <p className='text-red-500 text-sm'>
              {errors.nacionality?.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className={` ${label}`}>Gender</label>
          <select {...register('gender')} className={` ${input}`}>
            <option value=''>Select gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div>
          <label className={` ${label}`}>Clan</label>
          <select {...register('clan')} className={` ${input}`}>
            <option value=''>Select clan</option>
            <option value='Wolf Clan'>Wolf Clan</option>
            <option value='Turtle Clan'>Turtle Clan</option>
            <option value='Bear Clan'>Bear Clan</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <label className={` ${label}`}>Height</label>
          <input
            {...register('height')}
            placeholder='Height'
            className={` ${input}`}
          />
          {errors.height && (
            <p className='text-red-500 text-sm'>{errors.height?.message}</p>
          )}
        </div>{' '}
        <div>
          <label className={` ${label}`}>Weight</label>
          <input
            {...register('weight')}
            placeholder='Weight'
            type='number'
            className={` ${input}`}
          />
          {errors.weight && (
            <p className='text-red-500 text-sm'>{errors.weight?.message}</p>
          )}
        </div>{' '}
        <div>
          <label className={` ${label}`}>Eye colors</label>
          <select {...register('eye_color')} className={` ${input}`}>
            <option value=''>Select Eye colors</option>
            <option value='BLK'>Black</option>
            <option value='BLU'>Blue</option>
            <option value='BRO'>Brown</option>
            <option value='GRN'>Green</option>
            <option value='GRY'>Gray</option>
            <option value='HAZ'>Hazel</option>
            <option value='MAR'>Maroon</option>
            <option value='PNK'>Pink</option>
            <option value='DIC'>Dichromatic</option>
            <option value='UNK'>Unknown</option>
          </select>
        </div>{' '}
        <div>
          <label className={` ${label}`}>Hair color</label>
          <select {...register('hair_color')} className={` ${input}`}>
            <option value=''>Select Hair color</option>
            <option value='BAL'>Bald</option>
            <option value='BLK'>Black</option>
            <option value='BLN'>Blonde</option>
            <option value='BRO'>Brown</option>
            <option value='GRY'>Gray</option>
            <option value='RED'>Red</option>
            <option value='WHI'>White</option>
            <option value='SDY'>Sandy</option>
            <option value='UNK'>Unknown</option>
            <option value='BLU'>Blue</option>
            <option value='GRN'>Green</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <label className={` ${label}`}>Sign</label>
          <input
            {...register('sign')}
            placeholder='Sign'
            className={` ${input}`}
          />
        </div>{' '}
        <div>
          <label className={` ${label}`}>Fingerprints</label>
          <input
            {...register('fingerprints')}
            placeholder='Fingerprints (text or URL)'
            className={` ${input}`}
          />
        </div>
        <div className='w-full'>
          <label className={` ${label}`}>Photo</label>
          <input
            {...register('photo')}
            placeholder='Photo URL'
            className={` ${input}`}
          />
        </div>
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
