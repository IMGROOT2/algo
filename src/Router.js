import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
import problems from './assets/data/data.json'

const SITE_URL = 'https://algousaco.com'

// data.json is keyed by division; search engines land on /problem/:id, so index
// every problem by id once for the title/description lookup in afterEach.
const problemsById = new Map(
  Object.values(problems)
    .flat()
    .map((problem) => [problem.id, problem])
)

// Stored titles carry a "Problem N. " prefix that reads as noise in a search result.
const problemName = (title) => title.replace(/^Problem\s+\d+\.\s*/, '')

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Algo - USACO Practice Problem Generator',
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
  let title = to.meta.title || (to.name ? `${to.name} - Algo` : `Algo`)
  let description = to.meta.description

  if (to.path.startsWith('/problem/')) {
    const problem = problemsById.get(parseInt(to.params.id))
    if (problem) {
      // Name the problem rather than its id, so the page can rank for searches
      // like "USACO 2026 Bronze Photoshoot".
      const name = problemName(problem.title)
      title = `${name} - ${problem.subtitle} | Algo`
      description = `Read and solve ${name}, ${problem.subtitle}. Practice USACO problems and track your progress with Algo.`
    } else {
      title = `Problem ${to.params.id} - Algo`
    }
  }

  document.title = title
  document.getElementById('og-title-meta-tag')?.setAttribute('content', title)
  // set description meta tag
  document.getElementById('description-meta-tag-one')?.setAttribute('content', description)
  document.getElementById('description-meta-tag-two')?.setAttribute('content', description)
  // Without this every route would keep index.html's hardcoded homepage canonical,
  // which tells Google the problem pages are duplicates and drops them from the index.
  document.getElementById('canonical-link')?.setAttribute('href', SITE_URL + to.path)
  document.getElementById('og-url-meta-tag')?.setAttribute('content', SITE_URL + to.path)
})

export default router
