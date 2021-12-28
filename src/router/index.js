import Vue from 'vue'
import Router from 'vue-router'
import Order from '../pages/order'
import Recommend from '../pages/recommend'
import Seller from '../pages/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/order'
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/seller',
      component: Seller
    },
  ]
})
