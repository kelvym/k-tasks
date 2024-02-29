import { UserButton } from '@clerk/nextjs'
import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <nav className="w-60 h-full bg-black">
      <Navigation></Navigation>
      <UserButton />
      {/* <Logo /> */}
      {/* <Actions /> */}
    </nav>
  )
}
