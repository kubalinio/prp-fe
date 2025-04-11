import { useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

import type { TasksFilterOptions } from '@/api/actions/tasks/task.types'

import { taskQueries } from '@/api/actions/tasks/task.queries'
import { useGetTaskList, useMutation } from '@/libs/composables'
import { ref, watch } from 'vue'

const useListDetails = () => {
  const queryClient = useQueryClient()
  const route = useRoute()

  const taskListId = ref(route.params.id as string)

  const { data: taskList, refetchTaskList } = useGetTaskList(taskListId)

  const { mutate: createTask } = useMutation('createTask', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId.value).queryKey,
      })
    },
  })

  const { mutate: updateTask } = useMutation('updateTask', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId.value).queryKey,
      })
    },
  })

  const { mutate: deleteTask } = useMutation('deleteTask', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId.value).queryKey,
      })
    },
  })

  const { mutate: deleteSelectedTasks } = useMutation('deleteSelectedTasks', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId.value).queryKey,
      })
    },
  })

  const handleQueryFilter = async (filters: TasksFilterOptions) => {
    if (!filters || Object.keys(filters).length === 0) {
      queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId.value).queryKey,
      })
      return
    }

    refetchTaskList(filters)
  }

  watch(
    () => route.params.id as string,
    (value) => {
      taskListId.value = value
    },
  )

  return {
    // viewMode: store((state) => state.viewMode),
    // setViewMode: store((state) => state.setViewMode),
    taskList,
    createTask,
    updateTask,
    deleteTask,
    deleteSelectedTasks,
    handleQueryFilter,
  }
}

export { useListDetails }
