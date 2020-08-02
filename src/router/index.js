import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersList from '../views/UsersList'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'All users',
    component: UsersList
  },
      {
          path: '/:userId',
          name: 'User details',
          component: () => import('../views/UserDetails')
      },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
