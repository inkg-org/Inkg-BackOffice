import CreateCitizenForm from '@/src/components/organisms/Forms/CreateCitizenForm'
import React from 'react'

const RegisterCitizenPage = () => {
  return (
    <div>
      <h2 className='text-4xl font-semibold text-gray-800 mb-4'>
        Create a Citizen
      </h2>
      <p className='mb-12'>
        Here you can find all the documents that you earned being a Akwesasne
        citizen
      </p>
      <CreateCitizenForm />
    </div>
  )
}

export default RegisterCitizenPage
