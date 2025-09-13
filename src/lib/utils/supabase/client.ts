// src/lib/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import config from '../../config'
import { Database } from '../../types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    config.supabaseUrl,
    config.supabaseAnonKey
  )
}
