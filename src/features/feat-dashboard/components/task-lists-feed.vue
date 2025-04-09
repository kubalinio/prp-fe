<script setup lang="ts">
import { Container } from '@/components/ui/container'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { useGetTaskLists } from '@/libs/composables'
import {
  TaskListsItem,
  TaskListsItemHandle,
  TaskListsItemContent,
  TaskListsItemFooter,
  TaskListsItemActions,
} from '@/features/feat-dashboard/components/task-lists-item'

const { data: taskLists } = useGetTaskLists()
</script>

<template>
  <Container as="section">
    <Box class="mb-4 flex items-center gap-4">
      <h1 class="text-2xl font-bold">Task Lists</h1>
      <Button>Create Task List</Button>
    </Box>

    <Box class="grid grid-cols-1 gap-4">
      <TaskListsItem v-for="taskList in taskLists?.data" :key="taskList.id">
        <TaskListsItemHandle />

        <TaskListsItemContent
          :id="taskList.id"
          :title="taskList.title"
          :tasksMeta="taskList.tasksMeta"
        />

        <TaskListsItemActions :id="taskList.id" />

        <TaskListsItemFooter :created-at="taskList.createdAt" :updated-at="taskList.updatedAt" />
      </TaskListsItem>
    </Box>
  </Container>
</template>
