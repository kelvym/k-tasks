import { FileTypeIcon, MoreVerticalIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

export default function NoteItem({
  title,
  text,
  id,
}: {
  title: string
  text: string
  id: string
}) {
  return (
    <Link
      href={`/notes/${id}`}
      className="group transition-all overflow-hidden relative rounded-sm basis-1/3-gap-5 md:basis-1/3-gap-5 lg:max-w-52 bg-light hover:bg-background-secondary"
    >
      <div className="p-5">
        <div className="mb-3 flex justify-between gap-3">
          <span className="font-semibold leading-none text-dark group-hover:text-light text-base block break-all">
            {title}
          </span>
          <XIcon size={28} color="#c11111" className="w-7 shrink-0" />
        </div>
        <p className="text-xs break-words h-40 overflow-hidden text-foreground">
          {text}
        </p>
      </div>
    </Link>
  )
}
