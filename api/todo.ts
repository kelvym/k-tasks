import { createOptions } from '@/lib/create-http-options'
import { TodoSchema } from '@/schemas/todo-schema'
import { z } from 'zod'

export const getAll = async ({ auth }: { auth: Promise<string | null> }) => {
  const response = await fetch(
    '/api/v1/todo',
    createOptions({ auth: await auth })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()
  return z.array(TodoSchema).parse(json)
}

export const remove = async ({
  id,
  auth,
}: {
  id: string
  auth: Promise<string | null>
}) => {
  const response = await fetch(
    '/api/v1/todo/' + id,
    createOptions({ auth: await auth, method: 'DELETE' })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()

  return json
}

type todoTypeWithoutId = Omit<
  z.infer<typeof TodoSchema>,
  '_id' | 'dateCreated' | 'dateFinished' | 'isFinished'
>

interface createProps extends todoTypeWithoutId {
  auth: Promise<string | null>
}

export const create = async ({ auth, ...props }: createProps) => {
  const response = await fetch(
    '/api/v1/todo/',
    createOptions({ auth: await auth, method: 'POST', body: props })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()

  return json
}
