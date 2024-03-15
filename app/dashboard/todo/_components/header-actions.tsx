import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { TodoModal } from './todo/todo-modal'

export default function HeaderAction() {
  return (
    <TodoModal
      trigger={
        <Button size="sm" icon={PlusIcon}>
          <span className="text-sm">Add Note</span>
        </Button>
      }
    />
  )
}
