import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import AddUser from './views/AddUser.vue'

Vue.use(Router)

// Router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   console.log('called')
// })

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            noAuthRequired: false
          }
        },
        {
          path: 'add',
          name: 'AddUser',
          component: AddUser,
          meta: {
            noAuthRequired: false
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        noAuthRequired: true
      }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('token')
  // if (to.fullPath === '/') {
  //   if (!token) {
  //     next('/login')
  //   }
  // }
  // if (to.fullPath === '/login') {
  //   if (token) {
  //     next('/')
  //   }
  // }
  // next()
  let noAuthRequired = to.matched.some(record => record.meta.noAuthRequired)
  // when route requires auth and there's no current user, reidrect to '/login'
  if (!noAuthRequired && !isAuthenticated) {
    next('/login')
    // when we go to login route and are already logged in, we can skip this page
    // so we redirect to the homepage
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
    // if none of the above matches, we have a normal navigation that should just go through
    // so we call `next()`
  } else {
    next()
  }
})

export default router
