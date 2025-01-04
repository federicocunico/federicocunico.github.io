import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/ResumeView.vue'),
    },
    {
      path: '/hobbies',
      name: 'hobbies',
      component: () => import('../views/HobbiesView.vue'),
    }
  ],
})

export default router
