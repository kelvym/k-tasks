import { getNote } from '@/api/notes'
import { auth } from '@clerk/nextjs/server'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Note } from './_components/note'

export default async function NotesSlug({
  params,
}: {
  params: { slug: string }
}) {
  const { getToken } = auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', params.slug],
    queryFn: () => getNote({ id: params.slug, auth: getToken() }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Note id={params.slug} />
    </HydrationBoundary>
  )
}
