<script setup lang="ts">
import Breadcrumb from './components/breadcrumb.vue'
import { SidebarTrigger } from '@/components/layouts/app-sidebar'
import { Separator } from '@/components/ui/separator'
import TaskListsFeed from './components/task-lists-feed.vue'
</script>

<template>
  <header class="bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b p-4">
    <SidebarTrigger />

    <Separator orientation="vertical" class="mr-2 h-4" />

    <Breadcrumb />
  </header>

  <TaskListsFeed />
</template>
