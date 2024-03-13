import { UserButton } from '@clerk/nextjs'
import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <nav className="basis-10 md:basis-60 h-full p-8 pr-0 md:pr-8 shrink-0">
      <Navigation />
      <UserButton afterSignOutUrl="/" />
    </nav>
  )
}
