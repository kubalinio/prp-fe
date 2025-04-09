<script setup lang="ts">
import { Box } from '@/components/ui/box'
import { CardContent } from '@/components/ui/card'
import { TaskListsItemMetadata } from '@/features/feat-dashboard/components/task-lists-item'
import type { TaskListsResponse } from '@/api/actions/tasks/task.types'
import { RouterLink } from 'vue-router'

const { id, title, tasksMeta } = defineProps<{
  id: string
  title: string
  tasksMeta: TaskListsResponse['data'][number]['tasksMeta']
}>()
</script>

<template>
  <CardContent class="border-border flex w-full flex-1 items-center justify-between border-b py-4">
    <Box class="flex w-full flex-col gap-y-3 pr-8">
      <RouterLink :to="`/task-lists/${id}`" class="w-fit pl-0 text-xl">
        {{ title }}
      </RouterLink>

      <TaskListsItemMetadata :tasksMeta="tasksMeta" />
    </Box>
  </CardContent>
</template>
