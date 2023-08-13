import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - Algo` : `Algo`;
  document.querySelector("link[rel='canonical']")?.setAttribute("href", 
  new URL(to.path, "https://algousaco.com").toString());
});

export default router