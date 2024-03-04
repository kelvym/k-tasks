import { getAll } from '@/api/notes'
import { Header } from '@/components/header'
import { Content } from '@/components/ui/content'
import { Metadata } from 'next'
import { Breadcrumbs } from '../_components/breadcrumbs'
import HeaderAction from './_components/header-actions'
import NoteList from './_components/note-list'
import { request } from '@/lib/request'
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: 'Notes',
}

export default async function Notes() {
  const { getToken } = auth()

  const dataNotes = await request({ config: getAll(), auth: await getToken() })

  return (
    <>
      <Breadcrumbs />
      <Header title="Notes">
        <HeaderAction />
      </Header>
      <Content>
        <NoteList list={dataNotes || []} />
      </Content>
    </>
  )
}
