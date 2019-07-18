import Vue from 'vue'
import Vuex from 'vuex'
import globalTypes from '@/types/global'
import authModule from '@/modules/auth'
import expenditureModule from '@/modules/expenditure'
import incomeModule from '@/modules/income'
import {Validator} from 'vee-validate'
import validatorEs from '@/validators/es'
import validatorEn from '@/validators/en'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    processing: false,
    language: 'es'
  },
  actions: {
    [globalTypes.actions.changeLanguage]: ({commit}, lang) => {
      commit(globalTypes.mutations.setLanguage, lang);
      switch (lang) {
        case 'en': {
          Validator.localize('en', validatorEn);
          break
        }
        case 'es': {
          Validator.localize('en', validatorEs);
          break
        }
      }
    }
  },
  getters: {
    [globalTypes.getters.processing]: state => state.processing,
    [globalTypes.getters.language]: state => state.language,
  },
  mutations: {
    [globalTypes.mutations.startProcessing] (state) {
      state.processing = true;
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false;
    },
    [globalTypes.mutations.setLanguage] (state, lang) {
      state.language = lang;
    }
  },
  modules: {
    authModule,
    expenditureModule,
    incomeModule
  }
})
