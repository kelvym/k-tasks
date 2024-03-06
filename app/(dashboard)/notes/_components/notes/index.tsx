import { getAll } from '@/api/notes'
import { auth } from '@clerk/nextjs/server'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import NoteList from './note-list'

export default async function Notes() {
  const { getToken } = auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => getAll({ auth: getToken() }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteList />
    </HydrationBoundary>
  )
}
