import { getAll } from '@/api/notes'
import { Header } from '@/components/header'
import { Content } from '@/components/ui/content'
import { auth } from '@clerk/nextjs/server'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import { Breadcrumbs } from '../_components/breadcrumbs'
import HeaderAction from './_components/header-actions'
import NoteList from './_components/note-list'

export const metadata: Metadata = {
  title: 'Notes',
}

export default async function Notes() {
  const { getToken } = auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => getAll({ auth: getToken() }),
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Breadcrumbs />
        <Header title="Notes">
          <HeaderAction />
        </Header>
        <NoteList />
      </HydrationBoundary>
    </>
  )
}
