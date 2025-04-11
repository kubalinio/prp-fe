import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/features/feat-dashboard/feat-dashboard.vue'
import { useQueryClient } from '@tanstack/vue-query'
import { taskQueries } from '@/api/actions/tasks/task.queries'
import { useIndexDB } from '@/libs/composables'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: async () => {
        const queryClient = useQueryClient()
        const { client } = useIndexDB()

        await queryClient.ensureQueryData({
          queryKey: taskQueries.getAllTaskLists().queryKey,
          queryFn: taskQueries.getAllTaskLists().queryFn(client.value!),
        })
      },
    },
    {
      path: '/task-lists/:id',
      name: 'task-list-details',
      component: () => import('@/features/feat-task-list-details/feat-task-list-details.vue'),
      beforeEnter: async ({ params }) => {
        const queryClient = useQueryClient()
        const { client } = useIndexDB()

        const taskListId = Array.isArray(params.id) ? params.id[0] : params.id

        await queryClient.ensureQueryData({
          queryKey: taskQueries.getTaskList(taskListId).queryKey,
          queryFn: taskQueries.getTaskList(taskListId).queryFn(client.value!),
        })
      },
    },
  ],
})

export default router
