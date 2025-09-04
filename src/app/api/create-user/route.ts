import { NextResponse } from 'next/server'
import { createUserSchema } from '@/src/lib/types/createUser'
import { createAdminClient } from '@/src/lib/utils/supabase/createClient'

export async function POST(req: Request) {
  const body = await req.json()

  const parsed = createUserSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.format() },
      { status: 400 }
    )
  }

  const { email, password, role, ...profileData } = parsed.data

  const supabase = createAdminClient()

  const { data: userResponse, error: signUpError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role }
    })

  if (!userResponse?.user?.id) {
    return NextResponse.json(
      { error: signUpError?.message ?? 'Error creating user' },
      { status: 400 }
    )
  }

  const userId = userResponse.user.id

  const { error: profileError } = await supabase
    .from('profile')
    .update({ ...profileData })
    .eq('id', userId)

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  return NextResponse.json(
    { message: 'User created successfully', userId },
    { status: 200 }
  )
}
