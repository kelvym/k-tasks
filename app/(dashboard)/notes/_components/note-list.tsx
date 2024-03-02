import NoteItem from './note-item'

export default function NoteList({
  list,
}: {
  list: { _id: string; title: string; description: string }[]
}) {
  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {list.map(({ _id, title, description }) => (
        <NoteItem title={title} description={description} id={_id} key={_id} />
      ))}
    </div>
  )
}
