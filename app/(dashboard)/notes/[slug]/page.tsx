import { Header } from '@/components/header'
import type { Metadata } from 'next'
import { Breadcrumbs } from '../../_components/breadcrumbs'
import NoteEditor from './_components/note-editor'
import { auth } from '@clerk/nextjs/server'

export default async function NotesSlug({ params }: { params: any }) {
  const { getToken } = auth()

  const dataNote = await fetch(
    'http://localhost:4000/v1/notes/' + params.slug,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  ).then((res) => res.json())

  const { text, title } = dataNote

  return (
    <>
      <Breadcrumbs title={title} />
      <Header title={title}></Header>
      <div className="flex justify-center pb-14">
        <NoteEditor text={text} />
      </div>
    </>
  )
}
