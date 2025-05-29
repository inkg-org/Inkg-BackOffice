import { cn } from '@/src/lib/utils/cn'
import React from 'react'

export interface TextButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
const TextButton = ({
  children,
  className,
  ...buttonProps
}: TextButtonProps) => {
  return (
    <button
      className={cn(
        'underline text-center text-sm text-primary-700 hover:text-primary-400 cursor-pointer',
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default TextButton
