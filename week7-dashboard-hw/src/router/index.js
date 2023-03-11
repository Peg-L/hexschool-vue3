import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // createWebHistory 的模式 需要「後端能夠支援」，此處改為 createWebHashHistory
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/product/:id',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/DashboardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        }
      ]
    },
    { path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue') },

  ]
})

export default router
