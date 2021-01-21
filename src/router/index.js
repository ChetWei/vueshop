import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home'

Vue.use(VueRouter)

const routes = [
  {path : '/',redirect:'/login'},
  { path:'/login',component:Login },
  { path:'/home',component:Home },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to 将要访问的路径
  //from 代表从那个路径跳转来
  //next 是一个函数表示放行
  //next() 放行  next('/login') 强制跳转到指定的路径
  if(to.path === '/login') return next()
  //其他路径要判断是否有token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next("/login")
  next()
})



export default router
