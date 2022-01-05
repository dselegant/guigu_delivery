import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../views/Msite/Msite.vue'
import Search from '../views/Search/Search.vue'
import Order from '../views/Order/Order.vue'
import Profile from '../views/Profile/Profile.vue'
import Login from '../views/Login/Login.vue'
import Shop from '../views/Shop/Shop.vue'
import Goods from '../views/Shop/Goods/Goods'
import Rating from '../views/Shop/Rating/Rating.vue'
import Info from '../views/Shop/Info/Info.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Msite,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }

  }, {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  }, {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/shop',
    component: Shop,
    children: [{
      path: 'goods',
      component: Goods
    },
    {
      path: 'info',
      component: Info
    },
    {
      path: 'rating',
      component: Rating
    },
    {
      path: '',
      redirect: 'goods'
    }]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
