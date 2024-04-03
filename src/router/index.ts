import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/expenses-entry/:id',
      name: 'Expenses-entry',
      component: () => import('../views/Expenses-View.vue')
    }
  ]
})

export default router
