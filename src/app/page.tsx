import { Suspense } from 'react'
import LoadingScaffold from '../components/molecules/LoadingScaffold'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '../lib/utils/supabase/server'

export default function Page() {
  const supabase = createServerSupabaseClient()
  const response = supabase.auth.getSession()

  return (
    <Suspense fallback={<LoadingScaffold />}>
      <HomePageHandler promiseData={response} />
    </Suspense>
  )
}

interface HomePageHandlerProps {
  promiseData: any
}
async function HomePageHandler({ promiseData }: HomePageHandlerProps) {
  const {
    data: { session },
    error
  } = await promiseData

  if (session && !error) {
    redirect('/menu')
  } else {
    redirect('/login')
  }

  return <></>
}
