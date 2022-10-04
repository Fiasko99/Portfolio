import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const authRoutes = [
  '/auth', 
  '/refresh', 
  '/registration', 
]
const unProtectedRoutes = [
  '/', ...authRoutes
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: () => import('../views/Refresh.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('checkJWT')
      .then(() => {
        if (store.getters.getUser?.role == 'teacher') next()
        else next(from.path)
      })
    }
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: () => import('../views/Teachers.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('checkJWT')
      .then(() => {
        if (store.getters.getUser?.role == 'super-admin') next()
        else next(from.path)
      })
    }
  },
  {
    path: '/admin/to/user/:id',
    name: 'AdminToUser',
    component: () => import('../views/AdminToUser.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/edit/:role',
    name: 'SettingProfile',
    component: () => import('../views/SettingProfile.vue')
  },
  {
    path: '/user/:id',
    name: 'StudentProfile',
    component: () => import('../views/StudentProfile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_DEV_URI,
  routes
})

router.beforeResolve((to, from, next) => {
  store.dispatch('checkJWT')
  .then(() => {
    const access = store.getters.getAuth && store.getters.getConfirmed
    if (!unProtectedRoutes.includes(to.path) && !access) {
      next('/auth');
    } else if (authRoutes.includes(to.path) && access) {
      next(from.path);
    } else {
      next()
    }
  })
})

export default router
