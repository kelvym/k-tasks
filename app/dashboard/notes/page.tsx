import { Header } from '@/components/header'
import { Skeleton } from '@/components/ui/skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumbs } from '../_components/breadcrumbs'
import HeaderAction from './_components/header-actions'
import Notes from './_components/notes'

export const metadata: Metadata = {
  title: 'Notes',
}

export default async function NotesPage() {
  return (
    <>
      <Breadcrumbs />
      <Header title="Notes">
        <HeaderAction />
      </Header>
      <Suspense
        fallback={
          <div className="flex justify-center gap-4">
            <Skeleton className="h-40 w-44" />
            <Skeleton className="h-40 w-44" />
            <Skeleton className="h-40 w-44" />
            <Skeleton className="h-40 w-44" />
          </div>
        }
      >
        <Notes />
      </Suspense>
    </>
  )
}
