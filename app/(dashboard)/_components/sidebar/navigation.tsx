'use client'

import { NavItem } from './nav-item'
import { CameraIcon, AppleIcon } from 'lucide-react'

const navItems = [
  {
    key: 1,
    href: '/',
    text: 'Overview',
    icon: CameraIcon,
  },
  {
    key: 2,
    href: '/notes',
    text: 'Notes',
    icon: AppleIcon,
  },
  {
    key: 3,
    href: '/contact',
    text: 'Contact',
    icon: AppleIcon,
  },
]

export const Navigation = () => {
  return (
    <ul className="flex flex-col p-6">
      {navItems.map(({ href, icon, text, key }) => {
        return <NavItem href={href} icon={icon} text={text} key={key} />
      })}
    </ul>
  )
}
