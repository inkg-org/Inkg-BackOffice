import { ReactNode } from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
import MenuProvider from './provider'

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <MenuProvider>
      <div className='flex h-scren w-screen overflow-hidden bg-gray-100'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Header />
          <main className='flex-1 overflow-y-auto p-4 w-full ml-[256px]'>
          <div className='pt-28 p-8 mr-72'>
            {children}
            </div>
          </main>
        </div>
      </div>
    </MenuProvider>
  )
}
