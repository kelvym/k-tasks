'use client'

import { updateNote } from '@/api/notes'
import WYSIWYG from '@/components/wysiwyg'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditorEvents } from '@tiptap/react'
import { useParams } from 'next/navigation'
import { useDebounceCallback } from 'usehooks-ts'

export default function NoteEditor({ text }: { text: string }) {
  const queryClient = useQueryClient()
  const params = useParams()
  const { getToken } = useAuth()

  const mutateNote = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) =>
      updateNote({ id, text, auth: getToken() }),
    onSuccess: (_, { id, text }) => {
      queryClient.setQueryData(
        ['notes', id],
        (oldData: { id: string; text: string }) =>
          oldData
            ? {
                ...oldData,
                text,
              }
            : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const OnUpdate = async (value: EditorEvents['update']) => {
    const text = value.editor.getHTML()

    if (typeof params.slug === 'string') {
      mutateNote.mutate({ id: params.slug, text })
    }
  }
  const debounced = useDebounceCallback(OnUpdate, 1000)

  return <WYSIWYG content={text} OnUpdate={debounced} />
}
