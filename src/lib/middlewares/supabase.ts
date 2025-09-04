import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import config from '../config'

// IMPORTANT: Middleware from supabase docs, see https://supabase.com/docs/guides/auth/server-side/nextjs
// Cookies object was also modified to work with Next.js new cookies API
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = createServerClient(
    config.supabaseUrl,
    config.supabaseAnonKey,
    {
      cookies: {
        get(key) {
          return request.cookies.get(key)?.value
        },
        set(key, value, options) {
          try {
            request.cookies.set(key, value)
            supabaseResponse = NextResponse.next({ request })
            supabaseResponse.cookies.set(key, value, options)
          } catch {}
        },
        remove(key, options) {
          try {
            request.cookies.delete(key)
            supabaseResponse = NextResponse.next({ request })
            supabaseResponse.cookies.delete(key)
          } catch {}
        }
      }
    }
  )

  // Get user from Supabase
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/forgot-password') &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/new-password') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/verify') &&
    !request.nextUrl.pathname.startsWith('/api/auth/')
  ) {
    // No user and not protected route, then redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
