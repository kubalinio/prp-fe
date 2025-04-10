import { useQueryClient } from '@tanstack/vue-query'

import { taskQueries } from '@/api/actions/tasks/task.queries'
import { useGetTaskLists, useMutation } from '@/libs/composables'
import { useTaskListCreate } from '@/features/shared/composables/use-task-list-create'

const useTaskListsFeed = () => {
  const queryClient = useQueryClient()

  const { data: taskLists } = useGetTaskLists()

  const { openDialog, setOpenDialog, onSubmit, isLoading } = useTaskListCreate()

  const { mutate: deleteTaskList } = useMutation('deleteTaskList', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getAllTaskLists().queryKey,
      })
    },
  })

  return {
    taskLists,
    deleteTaskList,
    openDialog,
    setOpenDialog,
    onSubmit,
    isLoading,
  }
}

export { useTaskListsFeed }
