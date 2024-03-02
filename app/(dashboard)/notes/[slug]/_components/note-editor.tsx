'use client'

import WYSIWYG from '@/components/wysiwyg'

export default function NoteEditor({ text }: { text: string }) {
  const OnUpdate = (text: string) => {
    console.log('event: text updated')
  }
  return <WYSIWYG content={text} OnUpdate={OnUpdate} />
}
