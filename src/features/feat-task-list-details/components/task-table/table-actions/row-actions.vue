<script setup lang="ts">
import type { TaskListResponse } from '@/api/actions/tasks/task.types'
import type { Task } from '@/api/types'
import type { TaskStatusType } from '@/api/actions/tasks/task.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { MoreHorizontal } from 'lucide-vue-next'
import { useListDetails } from '@/features/feat-task-list-details/composables/use-list-details'
import { TaskStatus } from '@/api/actions/tasks/task.types'

const props = defineProps<{
  data: TaskListResponse
  item: Task
}>()

const { deleteTask, updateTask } = useListDetails()

const router = useRouter()
const isUpdatePending = ref(false)
const showDeleteDialog = ref(false)

const handleShowDetails = () => {
  router.push({
    path: `/task-lists/${props.data.id}/t/${props.item.id}`,
    replace: true,
  })
}

const handleEditTask = () => {
  router.push({
    path: `/task-lists/${props.data.id}/t/${props.item.id}/edit`,
  })
}

const handleStatusChange = async (newStatus: TaskStatusType) => {
  isUpdatePending.value = true
  try {
    await updateTask({
      id: props.item.id,
      data: {
        title: props.item.title,
        description: props.item.description,
        status: newStatus,
      },
    })
  } finally {
    isUpdatePending.value = false
  }
}

const handleDelete = async () => {
  isUpdatePending.value = true
  try {
    await deleteTask(props.item.id)
    showDeleteDialog.value = false
  } finally {
    isUpdatePending.value = false
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger :as-child="true">
      <div class="group flex justify-end">
        <Button
          size="icon"
          variant="ghost"
          class="text-muted-foreground/60 group-data-[state=open]:bg-accent/50 size-8 px-1.5 py-1 shadow-none"
          aria-label="Edit item"
        >
          <MoreHorizontal class="size-5" :size="20" aria-hidden="true" />
        </Button>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-auto">
      <DropdownMenuGroup>
        <DropdownMenuItem @click="handleShowDetails"> Details </DropdownMenuItem>

        <DropdownMenuItem @click="handleEditTask">Edit</DropdownMenuItem>

        <DropdownMenuItem
          @click="handleStatusChange(TaskStatus.IN_PROGRESS)"
          :disabled="isUpdatePending || props.item.status === TaskStatus.IN_PROGRESS"
        >
          Mark as In Progress
        </DropdownMenuItem>

        <DropdownMenuItem
          @click="handleStatusChange(TaskStatus.DONE)"
          :disabled="isUpdatePending || props.item.status === TaskStatus.DONE"
        >
          Mark as Done
        </DropdownMenuItem>

        <DropdownMenuItem
          @click="handleStatusChange(TaskStatus.TODO)"
          :disabled="isUpdatePending || props.item.status === TaskStatus.TODO"
        >
          Mark as To Do
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        @click="showDeleteDialog = true"
        class="dark:data-[variant=destructive]:focus:bg-destructive/10"
      >
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center"> Are you sure? </AlertDialogTitle>

        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this task.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter class="mt-2">
        <AlertDialogCancel :disabled="isUpdatePending"> Cancel </AlertDialogCancel>

        <AlertDialogAction
          @click="handleDelete"
          :disabled="isUpdatePending"
          class="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
