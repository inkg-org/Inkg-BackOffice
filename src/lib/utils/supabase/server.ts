import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import config from '../../config'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      get(key) {
        return cookieStore.get(key)?.value
      },
      set(key, value, options) {
        try {
          cookieStore.set(key, value, options)
        } catch {}
      },
      remove(key, options) {
        try {
          cookieStore.delete(key)
        } catch {}
      }
    }
  })
}
