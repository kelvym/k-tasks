import { dataNotes } from '@/app/data'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'
import { Breadcrumbs } from '../_components/breadcrumbs'
import NoteList from './_components/note-list'

export const metadata: Metadata = {
  title: 'Notes',
}

export default function Notes() {
  return (
    <>
      <Breadcrumbs />
      <Header title="Notes">
        <Button size="sm">
          <PlusIcon size={16} />
          <span className="text-sm">Add Note</span>
        </Button>
      </Header>
      <NoteList list={dataNotes} />
    </>
  )
}
