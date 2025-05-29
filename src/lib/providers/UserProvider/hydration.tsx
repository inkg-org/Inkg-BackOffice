'use client'

import { useEffect } from 'react'
import useUserProvider from '.'
import { supabase } from '../../utils/supabase'

const UserStoreHydration = () => {
  const setUser = useUserProvider((state) => state.setUser)

  useEffect(() => {
    useUserProvider.persist.rehydrate()

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user ?? null)
    }

    fetchUser()

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default UserStoreHydration
