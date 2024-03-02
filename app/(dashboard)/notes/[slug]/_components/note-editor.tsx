'use client'

import WYSIWYG from '@/components/wysiwyg'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useDebounceCallback } from 'usehooks-ts'
import { EditorEvents } from '@tiptap/react'

export default function NoteEditor({ text }: { text: string }) {
  const { getToken } = useAuth()
  const params = useParams()

  const OnUpdate = async (value: EditorEvents['update']) => {
    const text = value.editor.getText()

    await fetch(`http://localhost:4000/v1/notes/${params.slug}/text`, {
      body: JSON.stringify({ text }),
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => res.json())
  }
  const debounced = useDebounceCallback(OnUpdate, 1000)

  return <WYSIWYG content={text} OnUpdate={debounced} />
}
