import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    props:true,
    meta: { requiresGuest: true, }
  },
  {
    path: '/editpost/:id?',
    name: 'EditPost',
    component: () => import('../views/EditPost.vue'),
    meta: { requiresAuth: true },
    props:true
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: () => import('../views/NewPost.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.initializeAuth();
  // Védett útvonal kezelése
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Vendég útvonal kezelése (pl. login oldal)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/profile')
    return
  }

  next()
})

export default router
