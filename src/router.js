import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import IncomesView from './views/IncomesView.vue'
import LoginComponent from '@/components/Auth/Login'
import store from '@/store'
import authTypes from '@/types/auth'
import globalTypes from '@/types/global'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {Auth: true, title: 'Home'}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
      meta: {Auth: false, title: 'Login'},
      beforeEnter: (to, from, next) => {
        if (store.state.authModule.logged) {
          next({path: '/'});
        } else {
          next();
        }
      }
    },
    {
      path: '/incomes',
      name: 'incomes_view',
      component: IncomesView,
      meta: {Auth: true, title: 'Incomes'}
    },
    {
      path: '/expenditures',
      name: 'expenditures_view',
      meta: {Auth: true, title: 'Expenditures'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ExpendituresView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log(to);
  // console.log(from);
  if (to.meta.Auth && !store.state.authModule.logged) {
    next({path: '/login'});
  } else {
    next();
  }
});

export default router
