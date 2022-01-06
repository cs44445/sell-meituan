import Vue from 'vue'
import Router from 'vue-router'
import Order from '../pages/order'
import Ratings from '../pages/Ratings'
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
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    },
  ]
})
