import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.config.productionTip = false;
import BlockUI from 'vue-blockui'
Vue.use(BlockUI);

import VeeValidate, {Validator} from 'vee-validate'
import validatorEs from '@/validators/es'
Validator.localize('es', validatorEs);
Vue.use(VeeValidate);

// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n);
// import messages from '@/translations'
// const i18n = new VueI18n({
//   locale: store.getters.language,
//   messages
// });

// import {ClientTable} from 'vue-tables-2'
// Vue.use(ClientTable, {}, false, 'bootsrap4', 'default')

new Vue({
  // i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
