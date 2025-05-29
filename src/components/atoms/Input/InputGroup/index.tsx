import React from 'react'

export interface InputGroupProps {
  children?: React.ReactNode
}
const InputGroup = ({ children }: InputGroupProps) => {
  return <div className='rounded-md shadow-sm'>{children}</div>
}

export default InputGroup
