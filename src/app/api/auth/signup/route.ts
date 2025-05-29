import { createClient } from '@/src/lib/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const { firstName, lastName, email, password, repeatPassword } =
    await request.json()

  if (!firstName || !lastName || !email || !password || !repeatPassword) {
    return Response.json(
      { message: 'All fields are required' },
      { status: 400 }
    )
  }

  if (password !== repeatPassword) {
    return Response.json({ message: 'Passwords do not match' }, { status: 400 })
  }

  try {
    const response = await supabase.auth.signUp({
      email,
      password
    })

    const {
      data: { user },
      error: signUpError
    } = response

    if (signUpError || !user) {
      console.error(
        'Signup Error:',
        signUpError ? signUpError.message : 'Unknown error during signup.'
      )
      return Response.json(
        {
          message: 'Error during user registration',
          error: signUpError ? signUpError.message : 'User object is undefined'
        },
        { status: 500 }
      )
    }

    return Response.json(
      { message: 'User registered successfully', user },
      {
        status: 201,
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
