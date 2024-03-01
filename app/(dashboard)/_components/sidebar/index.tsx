import { UserButton } from '@clerk/nextjs'
import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <nav className="w-20 md:w-60 h-full bg-black p-5">
      <Navigation></Navigation>
      <UserButton />
    </nav>
  )
}
