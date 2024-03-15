import { Header } from '@/components/header'
import { Metadata } from 'next'
import { Breadcrumbs } from '../_components/breadcrumbs'
import HeaderAction from '../todo/_components/header-actions'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Todo } from './_components/todo'

export const metadata: Metadata = {
  title: 'To-do',
}

export default function TodoPage() {
  return (
    <>
      <Breadcrumbs />
      <Header title="To-do">
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
        <Todo />
      </Suspense>
    </>
  )
}
