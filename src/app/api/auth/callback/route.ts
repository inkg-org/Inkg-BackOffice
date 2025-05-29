import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login', origin))
  }

  try {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL('/login', origin))
    }

    return NextResponse.redirect(new URL('/menu', origin))
  } catch (error: any) {
    return NextResponse.redirect(new URL('/login', origin))
  }
}
