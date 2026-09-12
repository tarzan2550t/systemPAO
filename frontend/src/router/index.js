import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '../stores/auth.js'

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue') , 
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue') ,
    meta: { guest: true }
  },
  {
    path:'/first_login',
    name:'first_login',
    component: ()=> import('../views/first_login.vue') , 
    meta: { guest: true }
  },
  {
    path:'/admin',
    name: 'admin' ,
    component:() => import('../views/layouts.vue'),
    meta:{role : 'admin'} , 
    children:[
      {
        path:'home',
        name:'admin_home',
        component:() => import('../views/admin/Home.vue')
      },
      {
        path:'about',
        name:'admin_about',
        component:() => import('../views/admin/About.vue')
      }
    ]
  },
  {
    path:'/evaluatee',
    name:'evaluatee',
    component:()=> import('../views/layouts.vue'),
    meta:{role : 'evaluatee'} , 
    children:[
      {
        path:'evaluatee_home',
        name:'evaluatee_home',
        component:()=> import('../views/evaluatee/Home.vue')
      },
    ]
  },
  {
    path:'/evaluator',
    name:'evaluator',
    component:()=> import('../views/layouts.vue'),
    meta:{role : 'evaluator'} , 
    children:[
      {
        path:'evaluator_home',
        name:'evaluator_home',
        component:()=> import('../views/evaluator/Home.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to)=>{
  const auth = useAuthStore()
  if (auth.token && !auth.user) await auth.fetchMe()
  if (to.meta.guest) {
    if (auth.isLoggedIn) return redirectByRole(auth.user.role)
    return true
  }
  if (!auth.isLoggedIn) return { name: 'login' }
  if (to.meta.role && auth.user?.role !== to.meta.role)
    return redirectByRole(auth.user.role)
  return true

})


export function redirectByRole(role, purpose) {
  if (purpose === 'first_login') return { name: 'first_login' }
  if (role === 'admin')  return { name: 'admin_home' } 
  if (role === 'evaluatee') return { name: 'evaluatee_home' }
  if (role === 'evaluator') return { name: 'evaluator_home' }
  return { name: 'login' }
}

export default router