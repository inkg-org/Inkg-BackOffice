import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import config from '../../config'
import { Database } from '../../types/supabase'

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    config.supabaseUrl,
    config.supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // En server components no se pueden mutar cookies,
        // así que dejamos set/remove como no-ops
        set() {
          // noop
        },
        remove() {
          // noop
        }
      }
    }
  )
}
