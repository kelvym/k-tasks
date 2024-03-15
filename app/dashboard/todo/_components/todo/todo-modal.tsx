'use client'

import { create } from '@/api/todo'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TodoSchema } from '@/schemas/todo-schema'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type TodoModalEditProps = {
  _id: string
  type: string
  title: string
  description: string
  level: number
  trigger: React.ReactNode
}

type TodoModalAddProps = {
  trigger: React.ReactNode
}

const formSchema = TodoSchema.pick({
  type: true,
  title: true,
  description: true,
  level: true,
})

export function TodoModal(props: TodoModalEditProps | TodoModalAddProps) {
  const [isOpened, setIsOpened] = useState(false)
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  const createTodo = useMutation({
    mutationFn: ({
      type,
      title,
      description,
      level,
    }: z.infer<typeof formSchema>) => {
      return create({ auth: getToken(), type, title, description, level })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
      setIsOpened(false)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'type' in props ? props.type : '',
      title: 'title' in props ? props.title : '',
      description: 'description' in props ? props.description : '',
      level: 'level' in props ? props.level : 1,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTodo.mutate(values)
    console.log(values)
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            A new to-do item will be added to the list
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Exercise, Learning, Work, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Max 15 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Walk 30 min/day" {...field} />
                  </FormControl>
                  <FormDescription>Max 60 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Walk around the park for 30 minutes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" variant="secondary">
                Save
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
