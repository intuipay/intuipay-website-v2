import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Information from '../views/Information.vue'
import Pay from '../views/Pay.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/information',
  name: 'Information',
  component: Information
}, {
  path: '/pay/:id',
  name: 'Pay',
  component: Pay
}, {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router