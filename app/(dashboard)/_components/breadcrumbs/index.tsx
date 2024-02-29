'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Breadcrumbs = () => {
  const pathname = usePathname()

  const extractPaths = (pathname: string) => {
    let paths = pathname.split('/').filter((path) => path !== '')
    paths.unshift('')

    return paths
  }
  const listPaths = extractPaths(pathname)

  return (
    <div className="flex ">
      {listPaths.map((path, key) => {
        return (
          <div key={key} className="capitalize text-xs">
            <Link
              href={`/${path}`}
              className={cn({
                'text-white': key === listPaths.length - 1,
              })}
            >
              {path ? path : 'Overview'}
            </Link>

            {listPaths.length - 1 !== key && <span className="mx-2">/</span>}
          </div>
        )
      })}
    </div>
  )
}
