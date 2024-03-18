import { remove } from '@/api/todo'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { TodoModal } from './todo-modal'

type TodoItemProps = {
  id: string
  title: string
  description: string
  level: number
  type: string
}

export function TodoItem({
  id,
  title,
  description,
  level,
  type,
}: TodoItemProps) {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const removeTodo = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return remove({ id, auth: getToken() })
    },
    onSuccess: (_, { id }) => {
      queryClient.removeQueries({ queryKey: ['toto', id], exact: true })
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  return (
    <div
      className={cn(
        'relative min-h-36 basis-1/3-gap-5 md:basis-1/3-gap-5 lg:max-w-52 bg-light group transition-all overflow-hidden',
        { 'hover:bg-background-secondary': !isLoading }
      )}
    >
      {!isLoading && (
        <Button
          title="Remove"
          variant="link"
          className="p-0 absolute top-3 right-3 h-auto"
          onClick={() => {
            setIsLoading(true)
            removeTodo.mutate({ id })
          }}
        >
          <Trash2Icon
            size={24}
            className="w-7 shrink-0 group-hover:stroke-white"
          />
        </Button>
      )}
      {isLoading && <Loading />}
      <TodoModal
        title={title}
        id={id}
        description={description}
        level={level}
        type={type}
        trigger={
          <div className="p-5 h-full flex flex-col items-center">
            <span className="font-semibold text-dark group-hover:text-light text-base block break-all">
              {!isLoading && title}
            </span>
          </div>
        }
      />
    </div>
  )
}
