import type { ColumnDef, FilterFn } from '@tanstack/vue-table'
import type { TaskListResponse } from '@/api/actions/tasks/task.types'
import type { Task } from '@/api/types'

import { TaskStatus } from '@/api/actions/tasks/task.types'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { TaskStatusIndicator } from '@/features/shared/components/task-status'
import { cn, formatTaskListItemDate } from '@/libs/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { RowActions } from './table-actions'

interface GetColumnsProps {
  data: TaskListResponse
}

const statusFilterFn: FilterFn<Task> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const status: string = row.getValue(columnId)
  return filterValue.includes(status)
}

const getColumns = ({ data }: GetColumnsProps): ColumnDef<Task>[] => [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
        class: 'translate-y-0.5',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
        class: 'translate-y-0.5',
      }),
    enableSorting: false,
    enableHiding: false,
    size: 30,
  },
  {
    id: 'title',
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(TaskStatusIndicator, { status: row.original.status }),
        h(
          RouterLink,
          {
            to: `/task-lists/${row.original.listId}/t/${row.original.id}`,
            class: 'line-clamp-1 w-fit flex-1 text-sm/7 whitespace-normal subtitle-2',
            title: row.original.title,
          },
          () => row.original.title,
        ),
      ])
    },
    size: 300,
    enableHiding: false,
  },
  {
    id: 'description',
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) =>
      h(
        'span',
        {
          title: row.getValue('description'),
          class: 'text-muted-foreground line-clamp-1',
        },
        row.getValue('description'),
      ),
    size: 180,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) =>
      h('div', { class: 'flex h-full items-center pr-2 xl:pr-4' }, [
        h(
          Badge,
          {
            variant: 'default',
            class: cn('w-full gap-1 py-1 text-sm uppercase', {
              'bg-task-status-todo hover:bg-task-status-todo/80':
                row.original.status === TaskStatus.TODO,
              'bg-task-status-in-progress hover:bg-task-status-in-progress/80':
                row.original.status === TaskStatus.IN_PROGRESS,
              'bg-task-status-done hover:bg-task-status-done/80':
                row.original.status === TaskStatus.DONE,
            }),
          },
          () => row.original.status.replace(/-/g, ' '),
        ),
      ]),
    size: 140,
    filterFn: statusFilterFn,
  },
  {
    id: 'createdAt',
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) =>
      h(
        'span',
        { class: 'text-muted-foreground text-xs whitespace-nowrap' },
        formatTaskListItemDate(row.original.createdAt),
      ),
    size: 130,
  },
  {
    id: 'updatedAt',
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) =>
      h(
        'span',
        { class: 'text-muted-foreground text-xs whitespace-nowrap' },
        formatTaskListItemDate(row.original.updatedAt),
      ),
    size: 130,
  },
  {
    id: 'actions',
    header: () => h('span', { class: 'sr-only' }, 'Actions'),
    cell: ({ row }) => h(RowActions, { data, item: row.original }),
    size: 30,
    enableHiding: false,
  },
]

export { getColumns }
