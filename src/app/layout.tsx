import { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import { cn } from '../lib/utils/cn'
import './globals.css'
import GlobalProvider from './provider'
import publicPaths from '../lib/images'
import { ReactNode } from 'react'
import Providers from '../lib/providers/QueryProvider/QueryClientProvider'
import { Toaster } from 'react-hot-toast'
import UserStoreHydration from '../lib/providers/UserProvider/hydration'

const figtree = Figtree({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'Ierahkwa Ne Kanienke Government',
  description:
    'Principal application for Ierahkwa Ne Kanienke Government, allows citizens to use the platform'
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='es'>
      <head>
        <link
          rel='shortcut icon'
          href={publicPaths.identity.favicon}
          type='image/x-icon'
        />
      </head>
      <body
        className={cn(
          figtree.className,
          'relative min-h-screen min-w-full flex flex-col">'
        )}
      >
        {' '}
        <UserStoreHydration />
        <Providers>
          <Toaster position='bottom-center' />
          <GlobalProvider>{children}</GlobalProvider>
        </Providers>
      </body>
    </html>
  )
}
