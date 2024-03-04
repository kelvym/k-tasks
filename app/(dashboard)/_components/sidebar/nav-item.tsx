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
        <Icon size={20} color={pathname === href ? '#fff' : '#ebebf599'} />
        <span
          className={cn(
            'ml-4 text-foreground text-sm leading-none hidden md:block',
            {
              'text-white': pathname === href,
            }
          )}
        >
          {text}
        </span>
      </Link>
    </li>
  )
}
