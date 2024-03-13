import { cn } from '@/lib/utils'
import Link from 'next/link'

const links = [
  {
    href: '/sign-in?test=true',
    text: (
      <>
        Kelvym
        <br />
        <span className="font-normal text-sm">(User example)</span>
      </>
    ),
  },
  {
    href: '/dashboard',
    text: 'Sign-in / Sign-up',
    className: 'bg-[#455533]',
  },
]

export default function HomePage() {
  return (
    <div className="flex gap-6 w-full h-full justify-center items-center">
      {links.map(({ href, text, className }, index) => (
        <Link
          key={index}
          href={href}
          className={cn(
            'flex justify-center items-center w-60 h-52 bg-background-secondary p-12 text-center',
            className
          )}
        >
          <span className="text-2xl font-medium text-light">{text}</span>
        </Link>
      ))}
    </div>
  )
}
