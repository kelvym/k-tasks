'use client'

import { getAll } from '@/api/todo'
import { TodoSchema } from '@/schemas/todo-schema'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { TodoItem } from './todo-item'

type TodoRequest = z.infer<typeof TodoSchema>

export function TodoList() {
  const { getToken } = useAuth()

  const { data, isLoading } = useQuery<TodoRequest[]>({
    queryKey: ['todo'],
    queryFn: () => getAll({ auth: getToken() }),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-5 flex-wrap">
      {data?.map(({ _id, title, description, level, type }) => (
        <TodoItem
          key={_id}
          type={type}
          title={title}
          id={_id}
          description={description}
          level={level}
        />
      ))}
      {data?.length === 0 && (
        <div className="w-full text-sm">
          Nothing here. Add your first todo item
        </div>
      )}
    </div>
  )
}
