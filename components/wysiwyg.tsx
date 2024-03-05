import { cn } from '@/lib/utils'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react'
import { useState } from 'react'

type WYSIWYGProps = {
  content: string
  OnUpdate: (prop: any) => void
}

export default function WYSIWYG({ content, OnUpdate }: WYSIWYGProps) {
  const editor = useEditor({
    onUpdate: OnUpdate,
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Placeholder.configure({
        placeholder: 'Write something amazing!',
      }),
    ],
    autofocus: 'start',
    content: content,
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral prose-sm sm:prose-base p-5 focus:outline-none bg-background-secondary w-full h-full',
      },
    },
  })

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu flex gap-2 bg-background-secondary p-2 rounded text-sm items-center"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn({
              'is-active': editor.isActive('bold'),
            })}
          >
            <BoldIcon size={15} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn({
              'is-active': editor.isActive('italic'),
            })}
          >
            <ItalicIcon size={15} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn({
              'is-active': editor.isActive('strike'),
            })}
          >
            <StrikethroughIcon size={15} />
          </button>
        </BubbleMenu>
      )}

      {/* {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )} */}

      <EditorContent editor={editor} />
    </>
  )
}
