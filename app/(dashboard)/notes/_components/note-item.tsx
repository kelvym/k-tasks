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
      className="group transition-all h-52 overflow-hidden grow relative border-2 border-transparent rounded-sm lg:max-w-52 md:basis-1/4 basis-1/3 bg-background-secondary"
    >
      <div className="hidden group-hover:flex absolute w-full h-full bg-[rgba(0,0,0,0.70)] justify-center items-center flex-col gap-2">
        <div className="bg-background p-3 rounded">
          <FileTypeIcon size={28} color="#fff" />
        </div>
      </div>
      <div className="p-5">
        <span className="font-semibold text-header text-base mb-3 block">
          {title}
        </span>
        <p className="text-sm">{description}</p>
      </div>
      <div className=" absolute bottom-0 h-24 w-full from-20% bg-gradient-to-t from-background-secondary to-transparent"></div>
    </Link>
  )
}
