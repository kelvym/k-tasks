'use client'

import { getAll } from '@/api/notes'
import { NoteSchema } from '@/schemas/notes-schema'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import NoteItem from './note-item'

type NoteRequest = z.infer<typeof NoteSchema>

export default function NoteList() {
  const { getToken } = useAuth()

  const { data, isLoading } = useQuery<NoteRequest[]>({
    queryKey: ['notes'],
    queryFn: () => getAll({ auth: getToken() }),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {data?.map(({ _id, title, text }) => (
        <NoteItem title={title} text={text} id={_id} key={_id} />
      ))}
    </div>
  )
}
