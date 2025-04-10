<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import type { List } from '@/api/types'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/libs/utils'

import {
  TaskListCreate,
  TaskListCreateContent,
  TaskListCreateForm,
  TaskListCreateHeader,
  TaskListCreateTrigger,
} from '@/features/shared/components/task-list-create-dialog'
import { useTaskListCreate } from '@/features/shared/composables/use-task-list-create'

defineProps<{
  tasks: List[]
}>()

const router = useRouter()
const { openDialog, setOpenDialog, onSubmit, isLoading } = useTaskListCreate()
const { toggleSidebar, isMobile } = useSidebar()

const isActive = computed(() => (path: string) => {
  return router.currentRoute.value.path === path
})

const handleLinkClick = (list: List) => {
  if (isMobile.value) {
    toggleSidebar()
  }

  router.push(`/task-lists/${list.id}`)
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel className="mb-2 flex items-center justify-between text-sm">
      <span class="text-xs font-semibold">Task Lists</span>

      <TaskListCreate v-model="openDialog" @update:model-value="setOpenDialog">
        <TaskListCreateTrigger />

        <TaskListCreateContent>
          <TaskListCreateHeader>Create Task List</TaskListCreateHeader>

          <TaskListCreateForm :isLoading="isLoading" @submit="onSubmit" />
        </TaskListCreateContent>
      </TaskListCreate>
    </SidebarGroupLabel>

    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="list in tasks" :key="list.id" @click="handleLinkClick(list)">
          <SidebarMenuButton as-child>
            <Button
              variant="ghost"
              :class="
                cn('justify-start pl-2', {
                  'bg-accent': isActive(`/task-lists/${list.id}`),
                })
              "
            >
              <span class="bg-primary size-2 shrink-0 rounded-full" />

              <span>{{ list.title }}</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
