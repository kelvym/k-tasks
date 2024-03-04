import { Header } from '@/components/header'
import { Metadata } from 'next'
import { Breadcrumbs } from '../_components/breadcrumbs'
import HeaderAction from './_components/header-actions'
import NoteList from './_components/note-list'
import { auth } from '@clerk/nextjs/server'
import { Content } from '@/components/ui/content'

export const metadata: Metadata = {
  title: 'Notes',
}

export default async function Notes() {
  const { getToken } = auth()

  const dataNotes = await fetch('http://localhost:4000/v1/notes', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  }).then((res) => res.json())

  return (
    <>
      <Breadcrumbs />
      <Header title="Notes">
        <HeaderAction />
      </Header>
      <Content>
        <NoteList list={dataNotes} />
      </Content>
    </>
  )
}
