import { Button } from '@/components/ui/button'
import { PlusIcon, FileTypeIcon } from 'lucide-react'
import { dataNotes } from '@/app/data'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex justify-between w-full mb-5">
      <h1 className="text-2xl text-header">Notes</h1>
      <Button size="sm">
        <PlusIcon size={16} />
        <span className="text-sm">Add Note</span>
      </Button>
    </div>
  )
}

export default function Notes() {
  return (
    <>
      <Header />
      <div className="flex gap-5 flex-wrap justify-center">
        {dataNotes.map(({ id, title, description }) => (
          <Link
            href={`/notes/${id}`}
            key={id}
            className="group transition-all h-52 overflow-hidden grow relative border-2 border-transparent rounded-sm lg:max-w-52 md:basis-1/4 basis-1/3 bg-background-secondary"
          >
            <div className="hidden group-hover:flex absolute w-full h-full bg-[rgba(0,0,0,0.70)] justify-center items-center flex-col gap-2">
              <div className="bg-background flex flex-col p-3 rounded items-center gap-2">
                <FileTypeIcon size={28} color="#fff" />
                <span className="block text-xs text-white leading-none">
                  Edit note
                </span>
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
        ))}
      </div>
    </>
  )
}
