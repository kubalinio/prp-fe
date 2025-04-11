import { useSuspenseQuery } from '@/libs/composables'
import { taskQueries } from '@/api/actions/tasks/task.queries'

import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const useTaskDetails = () => {
  const router = useRouter()
  const { params } = useRoute()

  const taskListId = ref(params.id as string)
  const taskId = ref(params.taskId as string)

  const { data: task } = useSuspenseQuery({ ...taskQueries.getTask(taskId) })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/task-lists/${taskListId.value}`)
    }
  }

  const handleStartEdit = () => {
    router.push(`/task-lists/${taskListId.value}/t/${taskId.value}/edit`)
  }

  watch(
    () => params,
    (newParams) => {
      taskListId.value = newParams.id as string
      taskId.value = newParams.taskId as string
    },
    { immediate: true },
  )

  return { task: task.value?.data, handleOpenChange, handleStartEdit }
}

export { useTaskDetails }
