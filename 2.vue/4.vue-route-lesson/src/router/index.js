import Vue from 'vue'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


/**
 *
 * 
Vue.use = function (plugin,options) {
  plugin.install(this,options)
}
 */

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children:[
      {
        path: 'a',
        component: {
          render() {
            return <p>hello about-a</p>
          }
        }
      },
      {
        path: 'b',
        component: {
          render() {
            return <p>hello about-b</p>
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
