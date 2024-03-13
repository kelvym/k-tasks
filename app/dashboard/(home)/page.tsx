import { Header } from '@/components/header'
import { Breadcrumbs } from '../_components/breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Overview',
}

export default function Overview() {
  return (
    <>
      <Breadcrumbs />
      <Header title="Overview" />
    </>
  )
}
