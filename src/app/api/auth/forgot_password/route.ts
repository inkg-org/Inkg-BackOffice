import { createServerSupabaseClient } from '@/src/lib/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient()

  const { email } = await request.json()

  if (!email) {
    return Response.json({ message: 'Email is required' }, { status: 400 })
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      console.error('Error sending password reset email:', error)
      return Response.json(
        {
          message: 'Failed to send password reset email',
          error: error.message
        },
        { status: 500 }
      )
    }

    return Response.json(
      { message: 'Password reset email sent successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie':
            'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;'
        }
      }
    )
  } catch (error: any) {
    return Response.json(
      {
        message: 'Internal server error',
        error: error.message || error.toString()
      },
      { status: 500 }
    )
  }
}
