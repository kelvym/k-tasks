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
  console.log(data)
  return (
    <div className="flex gap-5 flex-wrap">
      {data?.map(({ _id, title }) => (
        <NoteItem title={title} id={_id} key={_id} />
      ))}
      {data?.length === 0 && (
        <div className="w-full text-sm">Nothing here. Add your first note</div>
      )}
    </div>
  )
}
