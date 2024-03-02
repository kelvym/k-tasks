'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeaderAction() {
  const { getToken } = useAuth()
  const router = useRouter()

  const onClick = async () => {
    const noteCreated = await fetch('http://localhost:4000/v1/notes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }).then((res) => res.json())

    router.push(`/notes/${noteCreated.id}`)
  }
  return (
    <Button
      size="sm"
      onClick={async () => {
        const noteCreated = await onClick()
      }}
    >
      <PlusIcon size={16} />
      <span className="text-sm">Add Note</span>
    </Button>
  )
}
