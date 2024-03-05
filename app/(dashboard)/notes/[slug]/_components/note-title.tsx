'use client'

import { updateTitle } from '@/api/notes'
import { Content } from '@/components/ui/content'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NoteTitle({ title }: { title: string }) {
  const [inputTitle, setInputTitle] = useState(title)
  const [isReady, setIsReady] = useState(false)

  const queryClient = useQueryClient()
  const params = useParams()
  const { getToken } = useAuth()

  const mutateNote = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTitle({ id, title, auth: getToken() }),
    onSuccess: (_, { id, title }) => {
      queryClient.setQueryData(['notes', id], (oldData: any) =>
        oldData
          ? {
              ...oldData,
              title,
            }
          : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  useEffect(() => {
    if (!isReady) {
      setIsReady(true)
      return
    }
    const timeoutId = setTimeout(() => {
      if (typeof params.slug === 'string') {
        mutateNote.mutate({ id: params.slug, title: inputTitle })
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTitle])

  return (
    <div className="mb-5 w-full md:w-[65ch]">
      <Content>
        <input
          type="text"
          value={inputTitle}
          onChange={(e) => {
            setInputTitle(e.target.value)
          }}
          className="bg-transparent"
        />
      </Content>
    </div>
  )
}
