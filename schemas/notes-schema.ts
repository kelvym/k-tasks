import z from 'zod'

export const NoteSchema = z.object({
  _id: z.string(),
  title: z.string(),
  text: z.string(),
})
