import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import MainPage from './views/MainPage.vue'
import Admin from './views/Admin.vue'
import BookView from './views/BookView.vue'
import Search from './views/Search.vue'
import MyCart from './views/MyCart.vue'
import Order from './views/Order.vue'
import AddBook from './views/AddBook.vue'
import UserManage from './views/UserManage.vue'
import AddUser from './views/AddUser.vue'
import OrderManage from './views/OrderManage.vue'
import BookManage from './views/BookManage.vue'
import Statistic from './views/Statistic.vue'
import BookStatic from './views/BookStatic.vue'
import UserStatic from './views/UserStatic.vue'

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
        },
        {
          path: 'statistic',
          name: 'statistic',
          component: Statistic
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'bookmanage',
          name: 'BookManage',
          component: BookManage
        },
        {
          path: 'addbook',
          name: 'AddBook',
          component: AddBook
        },
        {
          path: 'usermanage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: 'adduser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: 'ordermanage',
          name: 'OrderManage',
          component: OrderManage
        },
        {
          path: 'userstatic',
          name: 'UserStatic',
          component: UserStatic
        },
        {
          path: 'bookstatic',
          name: 'BookStatic',
          component: BookStatic
        }
      ]
    }
  ]
})
