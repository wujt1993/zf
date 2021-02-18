import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index'),
    redirect: '/book/query',
    children: [
      {
        path: '/book',
        name: 'book',
        component: () => import('@/views/books/Index'),
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/books/List'),
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/views/books/category'),
          },
          {
            path: 'query',
            name: 'query',
            component: () => import('@/views/books/query'),
          },
          {
            path: 'myBorrow',
            name: 'myBorrow',
            component: () => import('@/views/books/myBorrow'),
          },
          {
            path: 'approval',
            name: 'approval',
            component: () => import('@/views/books/approval'),
          },
          
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/users/Index'),
        children: [
          {
            path: 'reset',
            name: 'reset',
            component: () => import('@/views/users/Center'),
          },
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/users/List'),
          }
        ]
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
