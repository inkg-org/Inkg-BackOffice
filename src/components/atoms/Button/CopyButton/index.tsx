import toast from 'react-hot-toast'
import { IoCopyOutline } from 'react-icons/io5'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!')
      })
      .catch(() => {
        toast.error('Failed to copy')
      })
  }

  return (
    <span
      className='bg-gray-100 text-blue-600 text-md px-2 py-1 rounded-full cursor-pointer hover:bg-gray-200'
      onClick={handleCopy}
    >
      <IoCopyOutline />
    </span>
  )
}
