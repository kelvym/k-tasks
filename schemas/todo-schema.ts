import z from 'zod'

export const TodoSchema = z.object({
  _id: z.string(),
  type: z.string().max(15, { message: '' }), //generic type: sport, learning, work, etc. Get the list from the API
  title: z.string().max(60, { message: '' }),
  description: z.string(),
  dateCreated: z.string(),
  dateFinished: z.string(),
  level: z.number().gte(1).lte(3), //complexity level: 1, 2, 3
  isFinished: z.boolean(),
})
