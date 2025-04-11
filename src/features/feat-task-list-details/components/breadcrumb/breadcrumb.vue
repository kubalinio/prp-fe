<script setup lang="ts">
import { RouterLink } from 'vue-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import { useListDetails } from '../../composables/use-list-details'

const { taskList } = useListDetails()
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>Task Lists</BreadcrumbItem>

      <BreadcrumbSeparator />

      <BreadcrumbItem>
        <BreadcrumbLink class="bg-accent rounded-md px-2 py-1" asChild>
          <RouterLink :to="`/task-lists/${taskList?.id}`" variant="secondary" class="text-sm">
            {{ taskList?.title }}
          </RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
