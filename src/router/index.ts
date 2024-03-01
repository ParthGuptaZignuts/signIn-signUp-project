import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import LandingView from '@/views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreatePost from '@/views/CreatePost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/createpost',
      name: 'CreatePost',
      component: CreatePost,
      meta: {
        layout: 'LayoutCreate'
      }
    }
  ]
})

export default router
