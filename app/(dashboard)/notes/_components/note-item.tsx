import { FileTypeIcon } from 'lucide-react'
import Link from 'next/link'

export default function NoteItem({
  title,
  description,
  id,
}: {
  title: string
  description: string
  id: string
}) {
  return (
    <Link
      href={`/notes/${id}`}
      className="group transition-all h-52 overflow-hidden grow relative rounded-sm lg:max-w-52 md:basis-1/4 basis-1/3 bg-light hover:bg-background"
    >
      <div className="hidden group-hover:flex absolute w-full h-full justify-center items-center flex-col gap-2">
        <FileTypeIcon size={28} color="#fff" />
      </div>
      <div className="p-5">
        <span className="font-semibold text-dark group-hover:text-light text-base mb-3 block">
          {title}
        </span>
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  )
}
