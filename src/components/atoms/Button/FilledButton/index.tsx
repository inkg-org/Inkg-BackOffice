import React from 'react'
import LottieLoader from '../../Lottie/LottieLoader'
import { cn } from '@/src/lib/utils/cn'

export interface FilledButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
  icon?: React.ReactNode
}

const FilledButton = ({
  isLoading,
  disabled,
  icon,
  children,
  className,
  ...buttonProps
}: FilledButtonProps) => {
  return (
    <button
      className={cn(
        'bg-MainBlue text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1 transition-colors border-2 border-transparent',
        'hover:bg-transparent hover:text-MainBlue hover:border-MainBlue hover:opacity-85',
        isLoading || disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      disabled={isLoading || disabled}
      {...buttonProps}
    >
      {isLoading ? (
        <LottieLoader height={25} width={25} />
      ) : (
        <>
          {children}
          {icon && <span>{icon}</span>}
        </>
      )}
    </button>
  )
}

export default FilledButton
