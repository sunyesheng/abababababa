import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import news from '../components/news/news.vue'
import info from '../components/news/info.vue'
import goods from '../components/goods/goods.vue'
import mygoods from '../components/goods/mygoods'
import upgood from '../components/goods/upgood'
import addcheck from '../components/check/addcheck'
import checking from '../components/check/checking.vue'
import upmoney from '../components/check/upmoney'
import adminhome from '../components/adminhome.vue'
import arginfo from '../components/adimin/arginfo/arginfo'
import order from '../components/adimin/arginfo/order'
import addinfo from '../components/adimin/article/addinfo'
import checkinfo from '../components/adimin/article/checkinfo'
import checkcom from '../components/adimin/comcheck/checkcom'
import checked from '../components/adimin/comcheck/checked'
import index from '../components/adimin/index.vue'
import userinfo from '../components/adimin/userinfo/userinfo.vue'
import cominfo from '../components/adimin/userinfo/cominfo.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home',
    component: home,
    redirect: '/news',
    children: [
      { path: '/news', component: news },
      { path: '/goods', component: goods },
      { path: '/addcheck', component: addcheck },
      { path: '/checking', component: checking },
      { path: '/upmoney', component: upmoney },
      { path: '/mygoods', component: mygoods },
      { path: '/upgood', component: upgood },
      { path: '/info', component: info }
    ]
  },
  {
    path: '/adminhome',
    component: adminhome,
    redirect: '/index',
    children: [
      { path: '/arginfo', component: arginfo },
      { path: '/order', component: order },
      { path: '/addinfo', component: addinfo },
      { path: '/checkinfo', component: checkinfo },
      { path: '/checkcom', component: checkcom },
      { path: '/checked', component: checked },
      { path: '/index', component: index },
      { path: '/userinfo', component: userinfo },
      { path: '/cominfo', component: cominfo }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
