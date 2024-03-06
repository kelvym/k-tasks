import { remove } from '@/api/notes'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { XIcon } from 'lucide-react'
import Link from 'next/link'

export default function NoteItem({ title, id }: { title: string; id: string }) {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  const removeNote = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return remove({ id, auth: getToken() })
    },
    onSuccess: (_, { id }) => {
      queryClient.removeQueries({ queryKey: ['notes', id], exact: true })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return (
    <div className="relative min-h-36 basis-1/3-gap-5 md:basis-1/3-gap-5 lg:max-w-52 bg-light hover:bg-background-secondary group transition-all overflow-hidden">
      <Button
        variant="link"
        className="p-0 absolute top-3 right-3 z-10 h-auto"
        onClick={() => {
          removeNote.mutate({ id })
        }}
      >
        <XIcon
          size={28}
          color="#c11111"
          className="w-7 shrink-0 group-hover:stroke-white"
        />
      </Button>

      <Link href={`/notes/${id}`} className="block pt-7">
        <div className="p-5 h-full flex flex-col items-center">
          <span className="font-semibold text-dark group-hover:text-light text-base block break-all">
            {title}
          </span>
        </div>
      </Link>
    </div>
  )
}
