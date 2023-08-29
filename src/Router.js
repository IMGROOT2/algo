import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      description:
        'Algo is a web application that supercharges your training for the USACO by randomly generating problems from past contests.'
    },
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      description: 'View and edit your Algo profile.'
    },
    component: () => import('./views/ProfileView.vue')
  },
  {
    path: '/solve',
    name: 'Solve',
    meta: {
      description: 'Solve USACO problems and track your progress with Algo.'
    },
    component: () => import('./views/SolveView.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      description:
        'About Algo, the web application that supercharges your training for the USACO by randomly generating problems from past contests.'
    },
    component: () => import('./views/AboutView.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    meta: {
      description: 'View and track your progress on Algo through statistics and graphs.'
    },
    component: () => import('./views/StatisticsView.vue')
  },
  {
    path: '/problem/:id',
    name: 'Problem - Algo',
    meta: {
      description: 'View a USACO Problem in Algo.'
    },
    props: true,
    component: () => import('./views/ProblemView.vue')
  },
  {
    path: '/login',
    name: 'Log in',
    meta: {
      description: 'Log in or register for Algo to save your progress and access more features.'
    },
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/mock',
    name: 'Mock Contest',
    meta: {
      description: 'Take a mock USACO contest with Algo.'
    },
    component: () => import('./views/MockView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 Not Found',
    meta: {
      description: "Uh oh! The page you're looking for doesn't exist."
    },
    component: () => import('./views/404View.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  if (to.path.startsWith('/problem/')) {
    const id = to.params.id
    document.title = `Problem ${id} - Algo`
  } else {
    document.title = to.name ? `${to.name} - Algo` : `Algo`
  }
  // set description meta tag
  document.getElementById('description-meta-tag-one')?.setAttribute('content', to.meta.description)
  document.getElementById('description-meta-tag-two')?.setAttribute('content', to.meta.description)
})

export default router
