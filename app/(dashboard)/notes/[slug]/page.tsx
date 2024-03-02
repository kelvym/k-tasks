import { dataNotes } from '@/app/data'
import { Header } from '@/components/header'
import type { Metadata } from 'next'
import { Breadcrumbs } from '../../_components/breadcrumbs'
import NoteEditor from './_components/note-editor'

export async function generateMetadata(): Promise<Metadata> {
  const title = dataNotes[0].title

  return { title }
}

export default async function NotesSlug({ params }: { params: any }) {
  const { description = '', title = '' } =
    dataNotes.find((note) => note.id === parseInt(params.slug)) || {}

  return (
    <>
      <Breadcrumbs title={title} />
      <Header title={title}></Header>
      <div className="flex justify-center pb-14">
        <NoteEditor text={description} />
      </div>
    </>
  )
}
