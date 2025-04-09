<script setup lang="ts">
import type { TaskListsResponse } from '@/api/actions/tasks/task.types'
import { Box } from '@/components/ui/box'
import { Logs } from 'lucide-vue-next'
import { TaskStatusIndicator } from '@/features/shared/components/task-status'

interface TaskListItemMetadataProps {
  tasksMeta: TaskListsResponse['data'][number]['tasksMeta']
}

const { tasksMeta } = defineProps<TaskListItemMetadataProps>()
</script>

<template>
  <Box as="ul" class="text-muted-foreground/60 flex flex-wrap gap-4">
    <template v-for="(value, key) in tasksMeta" :key="key">
      <Box
        v-if="key !== 'total' && Object.keys(tasksMeta).indexOf(key) < 4"
        as="li"
        class="flex items-center gap-2"
      >
        <TaskStatusIndicator :status="key" />
        {{ value }}
      </Box>
    </template>

    <Box as="li" class="flex items-center gap-2">
      <Logs class="text-muted-foreground size-4" />
      {{ tasksMeta.total }}
    </Box>
  </Box>
</template>
