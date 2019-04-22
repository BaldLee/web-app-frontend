import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import MainPage from './views/MainPage.vue'
import Admin from './views/Admin.vue'
import BookView from './views/BookView.vue'
import Search from './views/Search.vue'
import MyCart from './views/MyCart.vue'
import Order from './views/Order.vue'

Vue.use(Router)

export default new Router({
  base: '/e-book',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: 'bookview',
          name: 'BookView',
          component: BookView
        },
        {
          path: 'search',
          name: 'Search',
          component: Search
        },
        {
          path: 'mycart',
          name: 'MyCart',
          component: MyCart
        },
        {
          path: 'order',
          name: 'Order',
          component: Order
        }
      ]
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin
    }
  ]
})
