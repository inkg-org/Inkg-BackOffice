import { Suspense } from 'react'
import { createClient } from '../lib/utils/supabase/server'
import LoadingScaffold from '../components/molecules/LoadingScaffold'
import { redirect } from 'next/navigation'

export default function Page() {
  const supabase = createClient()
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
