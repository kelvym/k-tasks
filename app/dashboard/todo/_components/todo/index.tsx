import { getAll } from '@/api/todo'
import { auth } from '@clerk/nextjs/server'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { TodoList } from './todo-list'

export async function Todo() {
  const { getToken } = auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['todo'],
    queryFn: () => getAll({ auth: getToken() }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  )
}
