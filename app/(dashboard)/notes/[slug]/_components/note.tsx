'use client'

import { getNote } from '@/api/notes'
import { Breadcrumbs } from '@/app/(dashboard)/_components/breadcrumbs'
import { Header } from '@/components/header'
import { NoteSchema } from '@/schemas/notes-schema'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import NoteEditor from './note-editor'
import NoteTitle from './note-title'

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
      <Header title="Edit"></Header>
      <div className="flex flex-col justify-center items-center pb-14">
        <div className="xl:max-w-6xl lg:max-w-2xl w-full">
          <NoteTitle title={data?.title || ''} />
          <NoteEditor text={data?.text || ''} />
        </div>
      </div>
    </>
  )
}
