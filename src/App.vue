<script setup lang="ts">
import { RouterView } from 'vue-router'

import { AppSidebar, SidebarProvider, SidebarInset } from '@/components/layouts/app-sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>
