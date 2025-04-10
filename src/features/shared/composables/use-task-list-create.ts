import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'

import { taskQueries } from '@/api/actions/tasks/task.queries'
import { useMutation } from '@/libs/composables'
import type { CreateTaskListInput } from '@/api/actions/tasks/task.types'

const useTaskListCreate = () => {
  const queryClient = useQueryClient()
  const openDialog = ref(false)

  const { mutate: createTaskList, isPending: isLoading } = useMutation('createTaskList', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getAllTaskLists().queryKey,
      })
      openDialog.value = false
    },
  })

  const onSubmit = (data: CreateTaskListInput) => createTaskList(data)

  const setOpenDialog = (value: boolean) => (openDialog.value = value)

  return {
    onSubmit,
    isLoading,
    openDialog,
    setOpenDialog,
  }
}

export { useTaskListCreate }
