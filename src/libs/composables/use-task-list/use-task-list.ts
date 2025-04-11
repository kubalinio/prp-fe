import { useQueryClient } from '@tanstack/vue-query'
import type {
  TaskListResponse,
  TaskListsResponse,
  TasksFilterOptions,
} from '@/api/actions/tasks/task.types'

import { taskQueries } from '@/api/actions/tasks/task.queries'
import { useIndexDB, useQuery, useSuspenseQuery } from '@/libs/composables'
import type { GenericQueryOptions } from '../use-suspense-query/use-suspense-query.types'
import { type Ref } from 'vue'

/**
 * Hook to get all task lists
 */
const useGetTaskLists = (
  filters?: Ref<TasksFilterOptions>,
  options?: GenericQueryOptions<TaskListsResponse>,
) => {
  const queryClient = useQueryClient()

  const query = useSuspenseQuery({
    ...taskQueries.getAllTaskLists(filters),
    ...options,
  })

  const resetTaskLists = (filters?: TasksFilterOptions) =>
    queryClient.invalidateQueries({ queryKey: taskQueries.getAllTaskLists(filters).queryKey })

  return { ...query, resetTaskLists }
}

/**
 * Hook to get a single task list by ID
 */
const useGetTaskList = (id: Ref<string>, options?: GenericQueryOptions<TaskListResponse>) => {
  const queryClient = useQueryClient()
  const { client } = useIndexDB()

  const query = useQuery({
    ...taskQueries.getTaskList(id),
    ...options,
  })

  const resetTaskList = (id: string) =>
    queryClient.invalidateQueries({
      queryKey: taskQueries.getTaskList(id).queryKey,
    })

  const refetchTaskList = (filters?: TasksFilterOptions) =>
    queryClient
      .fetchQuery({
        queryKey: [...taskQueries.getTaskList(id.value).queryKey, filters],
        queryFn: taskQueries.getTaskList(id.value, filters).queryFn(client.value!),
      })
      .then((res) => {
        queryClient.setQueryData(taskQueries.getTaskList(id.value).queryKey, res)

        return res
      })

  const refetch = (oldId: string) => {
    queryClient.cancelQueries({
      queryKey: taskQueries.getTaskList(oldId).queryKey,
    })

    queryClient.invalidateQueries({
      queryKey: taskQueries.getTaskList(id.value).queryKey,
    })

    query.refetch()
  }

  return { ...query, resetTaskList, refetchTaskList, refetch }
}

export { useGetTaskLists, useGetTaskList }
