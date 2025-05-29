'use client'

import React from 'react'
import Lottie, { LottieProps } from 'react-lottie'
import animationData from '@/public/lottie/loaderlottie.json'

export interface LottieLoaderProps extends Omit<LottieProps, 'options'> {}
export default function LottieLoader({ ...props }: LottieLoaderProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      <Lottie
        style={{
          cursor: 'default'
        }}
        options={defaultOptions}
        height={65}
        width={65}
        isClickToPauseDisabled
        {...props}
      />
    </div>
  )
}
