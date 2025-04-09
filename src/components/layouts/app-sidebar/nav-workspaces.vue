<script setup lang="ts">
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
import { useRouter } from 'vue-router'
import { cn } from '@/libs/utils'
import { computed } from 'vue'
defineProps<{
  tasks: List[]
}>()

const router = useRouter()
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
    <SidebarGroupLabel>Tasks List</SidebarGroupLabel>

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
