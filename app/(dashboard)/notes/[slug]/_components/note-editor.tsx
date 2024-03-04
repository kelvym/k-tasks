'use client'

import { updateNote } from '@/api/notes'
import WYSIWYG from '@/components/wysiwyg'
import { request } from '@/lib/request'
import { useAuth } from '@clerk/nextjs'
import { EditorEvents } from '@tiptap/react'
import { useParams } from 'next/navigation'
import { useDebounceCallback } from 'usehooks-ts'

export default function NoteEditor({ text }: { text: string }) {
  const params = useParams()
  const { getToken } = useAuth()

  const OnUpdate = async (value: EditorEvents['update']) => {
    const text = value.editor.getText()

    if (typeof params.slug === 'string') {
      await request({
        config: updateNote({ id: params.slug, text }),
        auth: await getToken(),
      })
    }
  }
  const debounced = useDebounceCallback(OnUpdate, 1000)

  return <WYSIWYG content={text} OnUpdate={debounced} />
}
