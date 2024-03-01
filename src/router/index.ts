import { createRouter, createWebHistory } from 'vue-router'
import home from '@views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/imageView',
      name: 'imageView',
      component: () => import('@views/imageView.vue')
    },
    {
      path: '/postThread',
      name: 'postThread',
      component: () => import('@views/postThread.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@views/test.vue')
    }
  ]
})

export default router
