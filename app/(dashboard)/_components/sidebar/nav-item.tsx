'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItemProps = {
  href: string
  icon: LucideIcon
  text: string
}
export const NavItem = ({ href, icon: Icon, text }: NavItemProps) => {
  const pathname = usePathname()

  return (
    <li className="">
      <Link
        href={href}
        className={cn('flex items-center py-3 rounded-md px-3', {
          'bg-primary': pathname === href,
        })}
      >
        <div className="mr-4">
          <Icon size={20} color={pathname === href ? '#fff' : '#ebebf599'} />
        </div>
        <span
          className={cn('text-foreground text-sm leading-none', {
            'text-white': pathname === href,
          })}
        >
          {text}
        </span>
      </Link>
    </li>
  )
}
