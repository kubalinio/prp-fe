<script setup lang="ts">
import { Container } from '@/components/ui/container'
import { Box } from '@/components/ui/box'
import {
  TaskListCreate,
  TaskListCreateTrigger,
  TaskListCreateContent,
  TaskListCreateHeader,
  TaskListCreateForm,
} from '@/features/shared/components/task-list-create-dialog'
import { useGetTaskLists } from '@/libs/composables'
import {
  TaskListsItem,
  TaskListsItemHandle,
  TaskListsItemContent,
  TaskListsItemFooter,
  TaskListsItemActions,
} from '@/features/feat-dashboard/components/task-lists-item'

import { useTaskListsFeed } from '../composables/use-task-lists-feed'

const { data: taskLists } = useGetTaskLists()
const { deleteTaskList, openDialog, setOpenDialog, isLoading, onSubmit } = useTaskListsFeed()
</script>

<template>
  <Container as="section">
    <Box class="mb-4 flex items-center gap-4">
      <h1 class="text-2xl font-bold">Task Lists</h1>

      <TaskListCreate v-model="openDialog" @update:model-value="setOpenDialog">
        <TaskListCreateTrigger className="p-1.5" />

        <TaskListCreateContent>
          <TaskListCreateHeader>Create Task List</TaskListCreateHeader>

          <TaskListCreateForm :isLoading="isLoading" @submit="onSubmit" />
        </TaskListCreateContent>
      </TaskListCreate>
    </Box>

    <Box class="grid grid-cols-1 gap-4">
      <TaskListsItem v-for="taskList in taskLists?.data" :key="taskList.id">
        <TaskListsItemHandle />

        <TaskListsItemContent
          :id="taskList.id"
          :title="taskList.title"
          :tasksMeta="taskList.tasksMeta"
        />

        <TaskListsItemActions
          :id="taskList.id"
          @delete-task-list="(id: string) => deleteTaskList(id)"
        />

        <TaskListsItemFooter :created-at="taskList.createdAt" :updated-at="taskList.updatedAt" />
      </TaskListsItem>
    </Box>
  </Container>
</template>
