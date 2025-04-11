<script setup lang="ts">
import type { Task } from '@/api/types'
import { TableHead, TableRow } from '@/components/ui/table'
import { cn } from '@/libs/utils'
import type { HeaderGroup } from '@tanstack/vue-table'
import { FlexRender } from '@tanstack/vue-table'
import { ArrowUpToLine, ArrowDownToLine } from 'lucide-vue-next'
interface TaskTableHeadProps {
  headerGroup: HeaderGroup<Task>
}

const { headerGroup } = defineProps<TaskTableHeadProps>()
</script>

<template>
  <TableRow :key="headerGroup.id" class="hover:bg-transparent">
    <TableHead
      v-for="header in headerGroup.headers"
      :key="header.id"
      :style="{ width: `${header.getSize()}px` }"
      class="bg-background-secondary border-border relative h-9 border-y select-none first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r"
    >
      <template v-if="!header.isPlaceholder">
        <button
          type="button"
          :class="cn('flex h-full cursor-pointer items-center gap-2 select-none')"
          @click="header.column.getToggleSortingHandler()?.($event)"
          :tabindex="header.column.getCanSort() ? 0 : undefined"
        >
          <FlexRender
            v-if="header.column.columnDef.header"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />

          <ArrowUpToLine
            v-if="header.column.getIsSorted() === 'asc'"
            class="shrink-0 opacity-60"
            :size="16"
            aria-hidden="true"
          />

          <ArrowDownToLine
            v-if="header.column.getIsSorted() === 'desc'"
            class="shrink-0 opacity-60"
            :size="16"
            aria-hidden="true"
          />
        </button>
      </template>
    </TableHead>
  </TableRow>
</template>
