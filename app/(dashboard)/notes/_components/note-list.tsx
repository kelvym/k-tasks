import Link from 'next/link'
import NoteItem from './note-item'

export default function NoteList({
  list,
}: {
  list: { id: number; title: string; description: string }[]
}) {
  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {list.map(({ id, title, description }) => (
        <NoteItem title={title} description={description} id={id} key={id} />
      ))}
    </div>
  )
}
