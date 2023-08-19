import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    description:
      'Algo is a web application that supercharges your training for the USACO by randomly generating problems from past contests.',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    description: 'View and edit your Algo profile.',
    component: () => import('./views/ProfileView.vue')
  },
  {
    path: '/about',
    name: 'About',
    description:
      'About Algo, the web application that supercharges your training for the USACO by randomly generating problems from past contests.',
    component: () => import('./views/AboutView.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    description: 'View and track your progress on Algo through statistics and graphs.',
    component: () => import('./views/StatisticsView.vue')
  },
  {
    path: '/login',
    name: 'Log in',
    description: 'Log in or register for Algo to save your progress and access more features.',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 Not Found',
    description: "Uh oh! The page you're looking for doesn't exist.",
    component: () => import('./views/404View.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  document.title = to.name ? `${to.name} - Algo` : `Algo`
  document.querySelector("meta[name='description']")?.setAttribute('content', to.description)
  document
    .querySelector("link[rel='canonical']")
    ?.setAttribute('href', new URL(to.path, 'https://algousaco.com').toString())
})

export default router
