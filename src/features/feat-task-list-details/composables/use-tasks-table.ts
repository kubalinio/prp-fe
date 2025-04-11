import { ref, computed } from 'vue'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from '@tanstack/vue-table'

import type { TasksFilterOptions, TaskStatusType } from '@/api/actions/tasks/task.types'
import type { Task } from '@/api/types'

import { useListDetails } from '../composables/use-list-details'

import { getColumns } from '../components/task-table/get-columns'
import { valueUpdater } from '@/components/ui/table/utils'

const useTasksTable = () => {
  const { taskList, deleteSelectedTasks, handleQueryFilter } = useListDetails()

  const columnFilters = ref<ColumnFiltersState>([])
  const columnVisibility = ref<VisibilityState>({})

  const sorting = ref<SortingState>([
    {
      id: 'updatedAt',
      desc: true,
    },
  ])

  const defaultTaskList = computed(() => ({
    id: '',
    title: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: { data: [], meta: { total: 0 } },
    tasksMeta: { total: 0, todo: 0, in_progress: 0, done: 0 },
  }))

  const columns = computed(() => getColumns({ data: taskList.value! ?? defaultTaskList.value }))

  const rowSelection = ref({})

  const table = useVueTable({
    get data() {
      return taskList.value?.tasks?.data ?? []
    },
    get columns() {
      return columns.value
    },
    state: {
      get sorting() {
        return sorting.value
      },
      get columnFilters() {
        return columnFilters.value
      },
      get columnVisibility() {
        return columnVisibility.value
      },
      get rowSelection() {
        return rowSelection.value
      },
    },

    enableRowSelection: true,
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const statusColumn = computed(() => table.getColumn('status'))
  const statusFacetedValues = computed(() => statusColumn.value?.getFacetedUniqueValues())
  const statusFilterValue = computed(() => statusColumn.value?.getFilterValue() as string[])

  const uniqueStatusValues = computed(() => {
    if (!statusColumn.value) return []
    const values = Array.from(statusFacetedValues.value?.keys() ?? [])
    return values.sort()
  })

  const statusCounts = computed(() => {
    if (!statusColumn.value) return new Map()
    return statusFacetedValues.value ?? new Map()
  })

  const selectedStatuses = computed(() => {
    return statusFilterValue.value ?? []
  })

  const handleDeleteRows = (selectedRows: Row<Task>[]) => {
    if (!table || !taskList.value?.tasks?.data) return

    deleteSelectedTasks({
      listId: taskList.value.id,
      taskIds: selectedRows.map((row) => row.original.id),
    })

    table.resetRowSelection()
  }

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn('status')?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    handleQueryFilter({ status: newFilterValue as TaskStatusType[] })

    table.getColumn('status')?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  const handleSearchFilter = (searchTerm: string) => {
    const filters: TasksFilterOptions = {}

    if (searchTerm) {
      filters.search = searchTerm
    }

    if (uniqueStatusValues.value.length > 0) {
      filters.status = uniqueStatusValues.value as TaskStatusType[]
    }

    handleQueryFilter(filters)
  }

  return {
    table,
    handleDeleteRows,
    handleStatusChange,
    handleSearchFilter,
    selectedStatuses,
    uniqueStatusValues,
    statusCounts,
    columns,
    isLoading: false,
    statusMeta: computed(() => taskList.value?.tasksMeta),
  }
}

export { useTasksTable }
