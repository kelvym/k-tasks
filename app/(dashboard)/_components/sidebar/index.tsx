import { UserButton } from '@clerk/nextjs'
import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <nav className="basis-10 md:basis-60 h-full bg-dark p-5 shrink-0">
      <Navigation />
      <UserButton />
    </nav>
  )
}
