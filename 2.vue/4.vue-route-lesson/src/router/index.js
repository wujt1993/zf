import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


/**
 *  Vue.use = function(plugin, options) {
 *      plugin.install(this, options);
 *  } 
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
    children: [
      {
        path: 'a',
        name: 'about-a',
        component: {
          render(h) {
            return <h2>hello about-a</h2>
          },
        }
      },
      {
        path: 'b',
        name: 'about-b',
        component: {
          render(h) {
            return <h2>hello about-b</h2>
          },
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next)=>{
//   setTimeout(()=>{
//     console.log(1)
//     next();
//   }, 1000)
// })
// router.beforeEach((to, from, next)=>{
//   setTimeout(()=>{
//     console.log(2)
//     next();
//   }, 1000)
// })
export default router
