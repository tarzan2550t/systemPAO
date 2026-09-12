import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '../stores/auth.js'

const routes = [
  {
  path: '/',
  redirect: '/login'
  },
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
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  // console.log('--- ROUTER ---')
  // console.log('to:', to.name)
  // console.log('token:', auth.token)
  // console.log('user:', auth.user)
  // console.log('isLoggedIn:', auth.isLoggedIn)
  // มี token แต่ยังไม่มี user → ดึง user จาก /me
  if (auth.token && !auth.user) {
    
    await auth.fetchMe()
  }
  // console.log('--- ROUTER ---')
  // console.log('to:', to.name)
  // console.log('token:', auth.token)
  // console.log('user:', auth.user)
  // console.log('isLoggedIn:', auth.isLoggedIn)

  // ยังไม่ได้ login

  if (!auth.isLoggedIn) {
    if (to.meta.guest) {
      
      return true
    }
   
    return { name: 'login' }
  }

  // Login แล้ว แต่เป็น first login
  if (auth.frist_login === 'first_login' && to.name !== 'first_login') {
    return { name: 'first_login' }
  }

  // Login แล้ว และพยายามเข้าหน้า guest
  
  if (to.meta.guest) { return redirectByRole(auth.user.role,auth.frist_login)}

  // ตรวจ role
  if ( to.meta.role && auth.user?.role !== to.meta.role) {
    
    return redirectByRole( auth.user.role, auth.frist_login)
  }

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