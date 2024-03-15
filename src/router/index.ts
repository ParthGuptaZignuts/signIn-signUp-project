import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import LandingView from '@/views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreatePost from '@/views/CreatePost.vue'
import ProjectDetails from '@/components/ProjectDetails.vue'
import MarketPlace from '@/views/MarketPlace.vue'
import MarketPlaceSubProducts from '@/components/MarketPlaceSubProducts.vue'
import MarketCart from '@/components/MarketCart.vue'
import fullSectionIndex from '../components/Github/fullSectionIndex.vue'
import HomePage from '@/views/HomePage.vue'

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
      component: CreatePost
    },
    {
      path: '/show/:id',
      name: 'show-project',
      component: ProjectDetails,
      props: true
    },
    {
      path: '/marketplace',
      name: 'marketPlace',
      component: MarketPlace,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/marketplace/category/:id',
      name: 'marketPlaceSubProduct',
      component: MarketPlaceSubProducts,
      props: true,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/marketplace/cart',
      name: 'MarketCart',
      component: MarketCart,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/githubuserfinder',
      name: 'fullSectionIndex',
      component: fullSectionIndex,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/imageHomepage',
      name: 'imageHomepage',
      component: HomePage,
      meta: {
        layout: 'default'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.name === 'Dashboard' && (!token || token === undefined)) {
    next({ name: 'Landing' })
  } else if ((to.name === 'Landing' || to.name === 'SignUp' || to.name === 'SignIn') && token) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
