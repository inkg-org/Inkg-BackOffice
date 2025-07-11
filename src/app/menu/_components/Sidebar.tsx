'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  IoGridOutline,
  IoSettingsOutline,
  IoPersonOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoCardOutline,
  IoDocumentOutline,
  IoAddCircleOutline

} from 'react-icons/io5'
import { useGlobalStore } from '../../_state/provider'
import { createClient } from '@/src/lib/utils/supabase/client'
import { HTMLProps } from 'react'
import { cn } from '@/src/lib/utils/cn'

const menuItems = [
  { name: 'Menu', route: '/menu', icon: IoGridOutline },
  { name: 'Documents', route: '/menu/documents', icon: IoDocumentOutline },
  { name: 'Credentials', route: '/menu/credentials', icon: IoCardOutline },
  { name: 'Profile', route: '/menu/profile', icon: IoPersonOutline },
  { name: 'Settings', route: '/menu/settings', icon: IoSettingsOutline },
  { name: 'Create Citizen', route: '/menu/register-citizen', icon: IoAddCircleOutline },
  { name: 'Help', route: '/menu/help', icon: IoHelpCircleOutline }
]

interface SidebarProps extends HTMLProps<HTMLDivElement> {
  className?: string
}

export default function Sidebar({
  className,
  style,
  ...divProps
}: SidebarProps) {
  const pathname = usePathname()
  const { setGlobalLoading } = useGlobalStore((store) => store)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    setGlobalLoading(true)
    await supabase.auth.signOut()
    router.refresh()
    setGlobalLoading(false)
  }

  return (
    <div
      style={style}
      className={cn(
        'fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md pt-[72px]',
        className
      )}
      {...divProps}
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <ul className='flex flex-col mt-3 p-4 space-y-4'>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`p-2 text-sm transition-colors duration-150 ease-in-out hover:bg-gray-200 rounded-lg ${
                  pathname === item.route ? 'bg-gray-200 font-bold ' : ''
                }`}
              >
                <Link href={`${item.route}`}>
                  <span className={'flex items-center text-gray-700 w-full'}>
                    <item.icon className='w-4 h-4 mr-2' />
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='p-5'>
          <button
            onClick={handleLogout}
            className='flex items-center justify-start w-full text-gray-700 hover:bg-gray-200 p-2 rounded-lg transition-colors duration-150 ease-in-out'
          >
            <IoLogOutOutline className='w-4 h-4 mr-2' /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}
