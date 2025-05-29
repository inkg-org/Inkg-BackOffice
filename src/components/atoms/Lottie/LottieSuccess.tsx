'use client'

import React from 'react'
import Lottie from 'react-lottie'
import animationData from '@/public/lottie/success.json'

export default function LottieSuccess() {
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
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  )
}
