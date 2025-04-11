<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

import { TaskListBreadcrumb } from './components/breadcrumb'
import { Container } from '@/components/ui/container'
import { TaskListHeader } from './components/task-list-header'
import { TaskTable } from './components/task-table'
</script>

<template>
  <header class="bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b p-4">
    <SidebarTrigger />

    <Separator orientation="vertical" class="mr-2 h-4" />

    <TaskListBreadcrumb />
  </header>

  <Container as="section">
    <TaskListHeader />

    <TaskTable />
  </Container>

  <router-view />
</template>
