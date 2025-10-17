import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ clave secreta
)

export async function POST(req: Request) {
  try {
    const { ids } = await req.json()

    for (const id of ids) {
      // 1️⃣ Eliminar usuario del sistema de autenticación
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
      if (authError) throw authError
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
