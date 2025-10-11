import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 🔑 Esta clave solo se usa en el servidor
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
