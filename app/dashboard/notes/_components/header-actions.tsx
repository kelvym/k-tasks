'use client'

import { create } from '@/api/notes'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HeaderAction() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  const createNote = useMutation({
    mutationFn: () => {
      return create({ auth: getToken() })
    },
    onSuccess: ({ id }: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      router.push(`/dashboard/notes/${id}`)
    },
  })

  return (
    <Button
      loading={loading}
      size="sm"
      onClick={() => {
        setLoading(true)
        createNote.mutate()
      }}
      icon={PlusIcon}
    >
      <span className="text-sm">Add Note</span>
    </Button>
  )
}
