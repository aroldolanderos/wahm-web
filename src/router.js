import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import IncomesView from '@/components/Incomes/IncomesView'
import LoginComponent from '@/components/Auth/Login'
import RegisterComponent from '@/components/Auth/Register'
import ExpendituresList from '@/components/Expenditure/ExpendituresList'
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
      path: '/register',
      name: 'register',
      component: RegisterComponent,
      meta: {Auth: false, title: 'Register'},
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
      component: ExpendituresList,
      meta: {Auth: true, title: 'Expenditures'}
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.Auth && !store.state.authModule.logged) {
    next({path: '/login'});
  } else {
    if (store.state.authModule.logged) {
      store.commit(authTypes.mutations.setUser);
    }
    next();
  }
});

export default router
