import LottieLoader from '../atoms/Lottie/LottieLoader'

export default function LoadingScaffold() {
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-14 sm:px-6 lg:px-8'>
      <LottieLoader />
    </div>
  )
}
