'use client'

import { NavItem } from './nav-item'
import { StickyNoteIcon, ListTodoIcon, HomeIcon } from 'lucide-react'

const navItems = [
  {
    key: 1,
    href: '/dashboard',
    text: 'Overview',
    icon: HomeIcon,
  },
  {
    key: 2,
    href: '/dashboard/notes',
    text: 'Notes',
    icon: StickyNoteIcon,
  },
  {
    key: 3,
    href: '/dashboard/contact',
    text: 'Contact',
    icon: ListTodoIcon,
  },
]

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {navItems.map(({ href, icon, text, key }) => {
        return <NavItem href={href} icon={icon} text={text} key={key} />
      })}
    </ul>
  )
}
