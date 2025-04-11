<script setup lang="ts">
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { useTasksTable } from '../../composables/use-tasks-table'
import TaskTableHead from './task-table-head.vue'
import { FlexRender } from '@tanstack/vue-table'

const { table } = useTasksTable()
</script>

<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TaskTableHead
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            :headerGroup="headerGroup"
          />
        </TableHeader>

        <TableBody>
          <template v-if="table.getRowModel().rows.length > 0">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="group"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :style="{ width: `${cell.column.getSize()}px` }"
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-if="table.getRowModel().rows.length === 0">
            <TableCell :colspan="table.getAllColumns().length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="mt-4 flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
  </div>
</template>
