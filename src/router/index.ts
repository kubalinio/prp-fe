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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/task-lists/:id',
      name: 'task-list-details',
      component: () => import('@/features/feat-task-list-details/feat-task-list-details.vue'),
    },
  ],
})

export default router
