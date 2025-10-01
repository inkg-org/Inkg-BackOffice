'use client'

import dynamic from 'next/dynamic'
import { ModalBuilderProps } from './ModalBuilder'
import LottieLoader from '@/src/components/atoms/Lottie/LottieLoader'

const ModalBuilder = dynamic(
  () => import('./ModalBuilder').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LottieLoader />
  }
)

export interface LazyModalProps extends ModalBuilderProps {}
const LazyModal = (props: LazyModalProps) => {
  return <ModalBuilder {...props} />
}

export default LazyModal
