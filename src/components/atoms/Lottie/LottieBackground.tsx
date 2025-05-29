'use client'

import React from 'react'
import Lottie from 'react-lottie'
import animationData from '@/public/lottie/background.json'

const LottieBackground = () => {
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
      <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
    </div>
  )
}

export default LottieBackground
