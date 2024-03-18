'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Breadcrumbs = ({ title }: { title?: string }) => {
  const pathname = usePathname()

  const pathSplitted = pathname.split('/')

  pathSplitted.shift()

  const buildFullPath = (index: number) => {
    return pathSplitted.slice(0, index + 1).join('/')
  }

  const extractPaths = ({ title }: { pathname: string; title?: string }) => {
    const paths = pathSplitted

    if (title) paths.splice(paths.length - 1, 1, title)

    return paths
  }
  const listPaths = extractPaths({ pathname, title })

  return (
    <div className="flex">
      {listPaths.map((path, key) => {
        return (
          <div key={key} className="capitalize text-xs flex items-center">
            <Link
              href={`/${buildFullPath(key)}`}
              className={cn('truncate max-w-36 inline-block leading-none', {
                'text-white': key === listPaths.length - 1,
              })}
            >
              {path}
            </Link>

            {listPaths.length - 1 !== key && (
              <span className="mx-2 leading-none">/</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
