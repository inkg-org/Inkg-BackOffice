import { createClient } from '@/src/lib/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const { email, password } = await request.json()

  if (!email || !password) {
    return Response.json(
      { message: 'Email and password are required' },
      { status: 400 }
    )
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Login Error:', error)
      return Response.json(
        { message: 'Login failed: ' + error.message, error: error.message },
        { status: 401 }
      )
    }

    return Response.json(
      { message: 'Login successful' },
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
