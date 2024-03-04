import { getNote } from '@/api/notes'
import { Header } from '@/components/header'
import { request } from '@/lib/request'
import { auth } from '@clerk/nextjs/server'
import { Breadcrumbs } from '../../_components/breadcrumbs'
import NoteEditor from './_components/note-editor'

export default async function NotesSlug({ params }: { params: any }) {
  const { getToken } = auth()

  const dataNote = await request({
    config: getNote({ id: params.slug }),
    auth: await getToken(),
  })
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
