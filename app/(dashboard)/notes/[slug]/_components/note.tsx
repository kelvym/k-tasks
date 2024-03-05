'use client'

import { getNote } from '@/api/notes'
import { Breadcrumbs } from '@/app/(dashboard)/_components/breadcrumbs'
import { Header } from '@/components/header'
import { NoteSchema } from '@/schemas/notes-schema'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import NoteEditor from './note-editor'

type NoteRequest = z.infer<typeof NoteSchema>

export const Note = ({ id }: { id: string }) => {
  const { getToken } = useAuth()

  const { data, isLoading } = useQuery<NoteRequest>({
    queryKey: ['notes', id],
    queryFn: () => getNote({ id, auth: getToken() }),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Breadcrumbs title={data?.title} />
      <Header title={data?.title || ''}></Header>
      <div className="flex justify-center pb-14">
        <NoteEditor text={data?.text || ''} />
      </div>
    </>
  )
}
