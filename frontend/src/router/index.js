import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path:'/admin',
    component:() => import('../views/layouts.vue'),
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
    component:()=> import('../views/layouts.vue'),
    children:[
      {
        path:'evaluatee_home',
        name:'evaluatee_home',
        component:()=> import('../views/evaluatee/Home.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router