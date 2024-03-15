'use client'

import { updateTitle } from '@/api/notes'
import { Input } from '@/components/ui/input'
import { useSavingLoading } from '@/store/saving-loading'
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
  const changeSavingLoading = useSavingLoading((state) => state.changeStatus)

  const mutateNote = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTitle({ id, title, auth: getToken() }),
    onSuccess: (_, { id, title }) => {
      queryClient.setQueryData(
        ['notes', id],
        (oldData: { id: string; title: string }) =>
          oldData
            ? {
                ...oldData,
                title,
              }
            : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      changeSavingLoading(false)
    },
  })

  useEffect(() => {
    if (!isReady) {
      setIsReady(true)
      return
    }
    const timeoutId = setTimeout(() => {
      if (typeof params.slug === 'string') {
        changeSavingLoading(true)
        mutateNote.mutate({ id: params.slug, title: inputTitle })
      }
    }, 1000)
    return () => {
      clearTimeout(timeoutId)
      changeSavingLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTitle])

  return (
    <div className="mb-5 w-full">
      <label
        htmlFor="note-title"
        className="block text-base font-semibold mb-2 text-light"
      >
        Title
      </label>
      <Input
        placeholder="Write the title here..."
        type="text"
        value={inputTitle}
        onChange={(e) => {
          setInputTitle(e.target.value)
        }}
        className="bg-background-secondary p-8 w-full"
      />
    </div>
  )
}
