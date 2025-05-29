'use client'

import { ReactNode, useEffect } from 'react'
import MenuStoreProvider, { useMenuStore } from './_state/provider'
import { createClient } from '@/src/lib/utils/supabase/client'

export interface MenuProviderProps {
  children: ReactNode
}
export default function MenuProvider({ children }: MenuProviderProps) {
  return (
    <MenuStoreProvider>
      <ProviderBody>{children}</ProviderBody>
    </MenuStoreProvider>
  )
}

interface ProviderBodyProps {
  children: ReactNode
}
function ProviderBody({ children }: ProviderBodyProps) {
  const { user, setUser } = useMenuStore((store) => store)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      supabase.auth.getUser().then(({ data: { user }, error }) => {
        if (user && !error) {
          setUser(user)
        }
      })
    }
  })

  return <>{children}</>
}
