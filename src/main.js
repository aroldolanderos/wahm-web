import Vue from 'vue'
import App from './App.vue'
import router from './router'
require ('./filters')

import vueResource from "vue-resource";
Vue.use(vueResource);
Vue.http.options.root = process.env.VUE_APP_API_URL_WAHM;
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  next();
});

import store from './store'

// Vue.config.productionTip = false;
import BlockUI from 'vue-blockui'
Vue.use(BlockUI);

import VeeValidate, {Validator} from 'vee-validate'
import validatorEs from '@/validators/es'
Validator.localize('es', validatorEs);
Vue.use(VeeValidate);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
import messages from '@/translations'
const i18n = new VueI18n({
  locale: store.state.language,
  messages
});


import {ClientTable} from 'vue-tables-2'
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default')

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
